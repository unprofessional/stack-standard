#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const template=await fs.readFile(path.join(dir,'viewer.html'),'utf8');
const raw=await fs.readFile(path.join(dir,'graph.json'),'utf8');
JSON.parse(raw);
const safe=raw.replace(/<\//g,'<\\/');
if(!template.includes('__GRAPH_DATA__')) throw new Error('viewer placeholder missing');
const output=template.replace('__GRAPH_DATA__',safe);
await fs.writeFile(path.join(dir,'layer-viz.html'),output);
console.log(`wrote layer-viz.html (${Buffer.byteLength(output)} bytes)`);
