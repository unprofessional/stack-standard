# stack-standard

The opinionated house stack for all new codebases. One set of conventions, every repo, so tooling becomes boilerplate and custom effort goes to the actual business logic.

## Layout

- [`STANDARD.md`](STANDARD.md) — the standard itself. Versioned, changed via PR like code, not like vibes.
- [`AGENTS.md`](AGENTS.md) — contributor instructions for coding agents; `CLAUDE.md` points to the same rules.
- [`security/`](security/) — linked security requirements for agents, dependencies, application boundaries, builds and releases; includes reusable records and primary references.
- [`viz/`](viz/) — codebase layer visualizer. Run it against any conforming repo and get an interactive graph of packages, files, API surface, config/env, external systems, and test coverage.
- [`audits/`](audits/) — per-repo assessments against the standard: conforms / deviates / grandfathered / worth migrating.
- [`template/`](template/) — repo scaffold with the standard and viz pre-wired (planned).
- [`dispatches/`](dispatches/) — queued coding-agent briefs (presets, template, audits) with status tracking.

## Security and automation

Start with the [security index](security/README.md) and use the guide relevant to the change. These requirements apply to human and agent contributions; they do not authorize unrelated infrastructure work.

**Mads and Claude are building a separate security-focused platform** for automatic dependency detection and updates, with an interactive dashboard for internal administration. This repo defines shared standards, not that platform's implementation. See the [automation boundary](security/automation.md).

## Quick start (viz)

```sh
node viz/analyze.mjs /path/to/repo   # writes viz/graph.json
node viz/build.mjs                   # writes viz/layer-viz.html (self-contained, offline)
# serve viz/layer-viz.html however you like
```

See [viz/README.md](viz/README.md) for what it extracts and its known limits.
