# viz — codebase layer visualizer

Static-analysis graph + self-contained interactive viewer for Node/TS/JS repos. No runtime instrumentation, no build integration, no dependencies (plain Node, regex/AST-free heuristics).

## Usage

```sh
node analyze.mjs /path/to/repo [outFile]   # default outFile: ./graph.json
node build.mjs                             # inlines graph.json into viewer.html → layer-viz.html
```

`layer-viz.html` is a single offline artifact — serve it with any static server, works on desktop and mobile (touch pan/pinch/tap).

Optional: put a `viz.externals.json` at the analyzed repo's root to teach the external-systems slice named services beyond literal HTTP origins:

```json
[
  { "id": "postgres", "pattern": "\\b(?:postgres|postgresql|DATABASE_URL)\\b", "kind": "database" },
  { "id": "stripe",   "pattern": "\\bstripe\\b", "kind": "payments api" }
]
```

## Slices

| Slice | What it shows | Layout |
|---|---|---|
| packages | workspace dependency graph from package.json | top-down flowchart (consumers above dependencies) |
| files | import/re-export graph | force-directed, clustered by package (colored hulls) |
| api | route → handler → what it touches | left-to-right flow |
| config | env var × file reference matrix + config manifests | bipartite matrix |
| tests | test files vs every production file | bipartite coverage map, uncovered files flagged |
| external | hosts/named services ↔ referencing files | two-column bipartite |

Plus a 3D layer stack view, zoom-LOD labels, directional arrows, and a click/tap node inspector (identity, connections, cross-slice appearances).

## What it extracts (heuristics)

- Imports/re-exports/require/dynamic-import resolved against `.ts`/`.js`/`index.*` candidates
- Express/Fastify-style route registrations, literal `route === '/path'` dispatch, `ROUTE` constants, `case '/path'`
- `process.env.X`, bracket env access, env-shaped uppercase string-map keys
- Literal HTTP origins (`.invalid`/`.example`/`.test`/fixture hosts discarded) + configured named services
- package.json workspace edges (deps/devDeps/peerDeps matching local package names)
- Test files (`test/` dirs, `*.test.*`/`*.spec.*`) → direct production imports

## Known limits

- Regex analysis, not a TypeScript parser: aliased imports, computed paths/routes/URLs, runtime plugin loading, and non-literal re-exports are missed; string literals/comments can create false positives.
- Test coverage = direct-import coverage, not execution coverage. Barrel files and transitively exercised modules can look uncovered.
- API slice shows direct handler imports only, not transitive call graphs.
- Matrix views get dense on very large repos; no search/filter yet.
- Conforming repos (see STANDARD.md §2) produce far cleaner graphs: standard file suffixes make layers legible without per-repo tuning. The long-term upgrade path is tree-sitter extraction per language.
