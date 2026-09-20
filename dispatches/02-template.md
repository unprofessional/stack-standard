# Dispatch 02 — repo template scaffold

Depends on: Dispatch 01 (presets must exist to consume).

## Goal

Build `template/` into a real, copy-able repo scaffold so a new project starts conforming to STANDARD.md with zero thought, and `npm run viz` works from commit one.

## Deliverables

A complete minimal service template in `template/`:

- ESM + TS strict skeleton per STANDARD §1 (consumes the presets from `presets/` — by workspace link for now, note publish swap in README).
- One example entity demonstrating full MDVC layering (§2, no collapsing):
  - `example.model.ts` — zod schema
  - `example.dao.ts` — Drizzle against Postgres, the only DB-touching file
  - `example.service.ts` — business logic, typed errors (§8)
  - `example.route.ts` — Fastify route with request/response schemas
- Generated OpenAPI v3 (§3) from the typed route definitions; `npm run openapi` emits `openapi.json`.
- Typed `src/config.ts` env loader with fail-fast validation + `.env.example` (§7).
- vitest setup (§5) with pglite bootstrap: schema applied once per run, TRUNCATE-based cleanup between tests, one example DAO test and one example service test proving the pattern.
- `npm run viz` — runs stack-standard's `viz/analyze.mjs` against the template, builds `layer-viz.html`, serves it locally.
- pre-commit hook (lint-staged) preinstalled and working from a fresh clone (§6).
- README: what it is, how to run/test, how to instantiate ("copy this directory, rename, delete the example entity" — or degitt instructions if trivial).

## Constraints

- The template must pass its own standard — it is the reference implementation. If any STANDARD.md rule proves unimplementable while building this, STOP and file the conflict in the PR description rather than silently deviating.
- Keep dependency count lean; every dep justified in README.
- No secrets, no internal hostnames/IPs in any file (this repo is public).

## Definition of done

- From a clean clone of the repo: `cd template && npm install && npm test && npm run openapi && npm run viz` all succeed.
- The generated `layer-viz.html` shows the example entity's four layers legibly in the files/api/tests slices (screenshot or description in PR).
- PR to `main`.
