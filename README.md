# stack-standard

The opinionated house stack for all new codebases. One set of conventions, every repo, so tooling becomes boilerplate and custom effort goes to the actual business logic.

## Layout

- [`STANDARD.md`](STANDARD.md) — the standard itself. Versioned, changed via PR like code, not like vibes.
- [`viz/`](viz/) — codebase layer visualizer. Run it against any conforming repo and get an interactive graph of packages, files, API surface, config/env, external systems, and test coverage.
- [`audits/`](audits/) — per-repo assessments against the standard: conforms / deviates / grandfathered / worth migrating.
- [`template/`](template/) — repo scaffold with the standard and viz pre-wired (planned).

## Quick start (viz)

```sh
node viz/analyze.mjs /path/to/repo   # writes viz/graph.json
node viz/build.mjs                   # writes viz/layer-viz.html (self-contained, offline)
# serve viz/layer-viz.html however you like
```

See [viz/README.md](viz/README.md) for what it extracts and its known limits.
