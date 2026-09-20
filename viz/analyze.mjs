#!/usr/bin/env node
// Layer visualizer: static analysis pass.
// Usage: node analyze.mjs <repoRoot> [outFile]
// Optional: <repoRoot>/viz.externals.json — [{ "id": "flipp", "pattern": "\\bflipp\\b", "kind": "external api" }, ...]
//           named services recognized beyond literal HTTP origins.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(process.argv[2] || process.cwd());
const OUT = path.resolve(process.argv[3] || path.join(path.dirname(fileURLToPath(import.meta.url)), 'graph.json'));
const SKIP = new Set(['node_modules', 'dist', '.git', 'coverage', 'fixtures']);
const SOURCE_EXT = new Set(['.ts', '.js']);
const CONFIG_NAMES = /(^|\/)(package\.json|tsconfig(?:\.[^/]+)?\.json|[^/]+\.config\.(?:ts|js|json)|\.env(?:\.[^/]+)?|Dockerfile|Jenkinsfile|docker-compose\.ya?ml)$/i;
const posix = (p) => p.split(path.sep).join('/');
const rel = (p) => posix(path.relative(ROOT, p));
const fileId = (p) => `file:${rel(p)}`;
const pkgId = (name) => `package:${name}`;
const uniqEdges = (edges) => [...new Map(edges.map((e) => [`${e.source}\0${e.target}`, e])).values()];

// Repo-specific named external services (optional).
let NAMED_SERVICES = [];
try {
  const cfg = JSON.parse(await fs.readFile(path.join(ROOT, 'viz.externals.json'), 'utf8'));
  NAMED_SERVICES = cfg.map((s) => [s.id, new RegExp(s.pattern, s.flags || 'i'), s.kind || 'service']);
} catch { /* none configured */ }

async function walk(dir, out = []) {
  for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}
async function json(file) { try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { return null; } }
function node(id, label, kind, extra = {}) { return { id, label, kind, ...extra }; }
function resolveImport(from, spec, sourceSet) {
  if (!spec.startsWith('.')) return null;
  const base = path.resolve(path.dirname(from), spec);
  const candidates = [base, ...['.ts','.js'].map(x=>base+x), ...['index.ts','index.js'].map(x=>path.join(base,x))];
  if (spec.endsWith('.js')) candidates.push(base.slice(0,-3)+'.ts');
  if (spec.endsWith('.ts')) candidates.push(base.slice(0,-3)+'.js');
  return candidates.find((p) => sourceSet.has(path.normalize(p))) ?? null;
}
function imports(text) {
  const found = [];
  const patterns = [/(?:import|export)\s+(?:[^'";]*?\s+from\s*)?["']([^"']+)["']/g, /require\s*\(\s*["']([^"']+)["']\s*\)/g, /import\s*\(\s*["']([^"']+)["']\s*\)/g];
  for (const re of patterns) for (const m of text.matchAll(re)) found.push(m[1]);
  return found;
}
function envNames(text) {
  const s = new Set();
  for (const m of text.matchAll(/process\.env\.([A-Z][A-Z0-9_]*)/g)) s.add(m[1]);
  for (const m of text.matchAll(/(?:process\.env|env)\[['"]([A-Z][A-Z0-9_]*)['"]\]/g)) s.add(m[1]);
  for (const m of text.matchAll(/\b([A-Z][A-Z0-9_]{2,})\s*:\s*['"][^'"]*['"]/g)) if (/(?:URL|TOKEN|KEY|ID|PORT|MODE|ROOT|DATABASE)/.test(m[1])) s.add(m[1]);
  return [...s];
}
function routes(text) {
  const out = [];
  for (const m of text.matchAll(/\b(?:app|server|router|fastify|api)\.(get|post|put|patch|delete|options|head)\s*\(\s*["'`]([^"'`]+)["'`]/gi)) out.push({method:m[1].toUpperCase(), route:m[2]});
  for (const m of text.matchAll(/\b(?:route|pathname)\s*(?:===|==|!==|!=)\s*["'](\/[A-Za-z0-9_?&=:\/.{}-]+)["']/g)) out.push({method:'HTTP',route:m[1]});
  for (const m of text.matchAll(/\b(?:WEBHOOK_)?ROUTE\s*=\s*["'](\/[A-Za-z0-9_?&=:\/.{}-]+)["']/g)) out.push({method:'HTTP',route:m[1]});
  for (const m of text.matchAll(/\bcase\s+["'](\/[A-Za-z0-9_?&=:\/.{}-]+)["']/g)) out.push({method:'HTTP',route:m[1]});
  return out;
}
function services(text) {
  const found = new Map();
  for (const m of text.matchAll(/https?:\/\/[A-Za-z0-9.-]+(?::\d+)?/g)) {
    try { const u = new URL(m[0]); if (!/^(?:fixture|example)\./.test(u.hostname) && !/\.(?:invalid|example|test)$/.test(u.hostname)) found.set(`host:${u.hostname}`, {label:u.hostname, kind:'http host'}); } catch {}
  }
  for (const [id,re,kind] of NAMED_SERVICES) if (re.test(text)) found.set(`service:${id}`, {label:id,kind});
  return [...found.entries()].map(([id,v])=>({id,...v}));
}

const all = await walk(ROOT);
const sourceFiles = all.filter((f) => SOURCE_EXT.has(path.extname(f)) && !rel(f).endsWith('.d.ts')).sort();
const sourceSet = new Set(sourceFiles.map(path.normalize));
const contents = new Map(await Promise.all(sourceFiles.map(async f => [f, await fs.readFile(f,'utf8')])));

const packageFiles = all.filter((f) => path.basename(f)==='package.json').sort();
const packages = [];
for (const manifest of packageFiles) {
  const data = await json(manifest); if (!data?.name) continue;
  packages.push({ name:data.name, dir:path.dirname(manifest), manifest, data });
}
packages.sort((a,b)=>a.dir.length-b.dir.length);
const containingPackage = (f) => [...packages].sort((a,b)=>b.dir.length-a.dir.length).find((p)=>f===p.dir || f.startsWith(p.dir+path.sep));

const packageNodes = packages.map(p=>node(pkgId(p.name),p.name,'workspace',{path:rel(p.dir)||'.'}));
const packageEdges = [];
const packageNames = new Set(packages.map(p=>p.name));
for (const p of packages) for (const dep of Object.keys({...p.data.dependencies,...p.data.devDependencies,...p.data.peerDependencies})) if(packageNames.has(dep)) packageEdges.push({source:pkgId(p.name),target:pkgId(dep)});

const fileNodes = sourceFiles.map(f=>node(fileId(f),rel(f), /(?:^|\/)test\//.test(rel(f)) || /\.test\.[tj]s$/.test(f)?'test file':'source file'));
const fileEdges=[];
for (const f of sourceFiles) for(const spec of imports(contents.get(f))) { const target=resolveImport(f,spec,sourceSet); if(target) fileEdges.push({source:fileId(f),target:fileId(target)}); }

const apiNodes = new Map(), apiEdges=[];
for(const f of sourceFiles.filter(f=>!/(?:^|\/)test\//.test(rel(f)) && !/\.(?:test|spec)\.[tj]s$/.test(f))) for(const r of routes(contents.get(f))) { const id=`route:${r.method}:${r.route}`; apiNodes.set(id,node(id,`${r.method} ${r.route}`,'route')); apiEdges.push({source:id,target:fileId(f)}); }

const configNodes=new Map(), configEdges=[];
for(const f of sourceFiles) for(const name of envNames(contents.get(f))) { const id=`env:${name}`; configNodes.set(id,node(id,name,'env var')); configEdges.push({source:id,target:fileId(f)}); }
for(const f of all.filter(f=>CONFIG_NAMES.test(rel(f)))) { const id=fileId(f); configNodes.set(id,node(id,rel(f),'config file')); const pkg=containingPackage(f); if(pkg) configEdges.push({source:id,target:pkgId(pkg.name)}); }

const externalNodes=new Map(), externalEdges=[];
for(const f of sourceFiles) for(const svc of services(contents.get(f))) { externalNodes.set(svc.id,node(svc.id,svc.label,svc.kind)); externalEdges.push({source:svc.id,target:fileId(f)}); }

const testFiles=sourceFiles.filter(f=>/(?:^|\/)test\//.test(rel(f)) || /\.(?:test|spec)\.[tj]s$/.test(f));
const testSet=new Set(testFiles);
// Keep every production source in the coverage slice, not only files reached by a test.
// This makes zero-edge nodes an explicit, useful uncovered signal in the viewer.
const testNodeMap=new Map(sourceFiles.filter(f=>!testSet.has(f)).map(f=>[fileId(f),node(fileId(f),rel(f),'source file')])), testEdges=[];
for(const f of testFiles){ testNodeMap.set(fileId(f),node(fileId(f),rel(f),'test file')); for(const spec of imports(contents.get(f))){const target=resolveImport(f,spec,sourceSet); if(target && !testSet.has(target)){testEdges.push({source:fileId(f),target:fileId(target)});}}}

const crosslinks=[];
for(const f of sourceFiles){const pkg=containingPackage(f); if(pkg) crosslinks.push({source:fileId(f),target:pkgId(pkg.name),kind:'contained-by'});}
const slices=[
  {id:'packages',name:'Packages',nodes:packageNodes,edges:uniqEdges(packageEdges)},
  {id:'files',name:'Files',nodes:fileNodes,edges:uniqEdges(fileEdges)},
  {id:'api',name:'API Surface',nodes:[...apiNodes.values(),...new Map(apiEdges.map(e=>[e.target,fileNodes.find(n=>n.id===e.target)])).values()].filter(Boolean),edges:uniqEdges(apiEdges)},
  {id:'config',name:'Config + Env',nodes:[...configNodes.values(),...new Map(configEdges.map(e=>{const n=fileNodes.find(n=>n.id===e.target)||packageNodes.find(n=>n.id===e.target);return [e.target,n]})).values()].filter(Boolean),edges:uniqEdges(configEdges)},
  {id:'external',name:'External Systems',nodes:[...externalNodes.values(),...new Map(externalEdges.map(e=>[e.target,fileNodes.find(n=>n.id===e.target)])).values()].filter(Boolean),edges:uniqEdges(externalEdges)},
  {id:'tests',name:'Test Coverage',nodes:[...testNodeMap.values()],edges:uniqEdges(testEdges)}
];
for(const s of slices) s.nodes=[...new Map(s.nodes.map(n=>[n.id,n])).values()];
const graph={meta:{root:ROOT,generatedAt:new Date().toISOString(),heuristic:true},slices,crosslinks:uniqEdges(crosslinks)};
await fs.writeFile(OUT,JSON.stringify(graph,null,2)+'\n');
console.log(`wrote ${OUT}`);
for(const s of slices){const degree=new Map(s.nodes.map(n=>[n.id,0]));for(const e of s.edges){degree.set(e.source,(degree.get(e.source)||0)+1);degree.set(e.target,(degree.get(e.target)||0)+1)}console.log(`${s.id}: ${s.nodes.length} nodes, ${s.edges.length} edges, ${[...degree.values()].filter(x=>!x).length} orphans`)}
