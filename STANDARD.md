# STANDARD.md — the house stack

Status: **v0.2** — first red-pen pass applied (mads, 2026-09-20). Items marked ⚠ are still open.

Goal: every codebase we build is predictable. Same layout, same layering, same tooling, so cross-repo work (review, dispatch, visualization, onboarding) is cheap and all custom effort goes into business logic / engines / algorithms.

## 1. Language & runtime

- **Node.js, ESM only.** No CommonJS in new code. `"type": "module"` in every package.json.
- **TypeScript** for anything with a schema, API surface, DAO layer, or more than one contributor. Plain JS is acceptable for throwaway scripts and single-file tools; the moment a script grows a second file or a data shape, it graduates to TS.
- TS config: `strict: true`, no implicit any, ESM module resolution (`NodeNext`).

## 2. API backend layering (MDVC)

For any service exposing an HTTP API, each entity gets up to four files:

```
entity.model.ts     → shape, validation, types (zod or equivalent)
entity.dao.ts       → persistence only; the ONLY file that talks to the DB
entity.service.ts   → business logic; composes DAOs, owns transactions
entity.route.ts     → HTTP surface; parse/validate input, call service, shape response
```

Rules:
- Dependencies point one way: route → service → dao → model. Never skip a layer downward, never point upward.
- Routes contain **no business logic**. Services contain **no SQL**. DAOs contain **no HTTP concepts**.
- Cross-entity access goes service → service, not dao → dao.
- **No collapsing, no escape valve** (ruled 2026-09-20). Thin layers stay as four files even for tiny services: determinism beats brevity — analysis tooling (viz, audits, dispatch) can rely on file names without special cases, and layers thicken over time without restructure.

## 3. API contracts

- **Server framework: Fastify.**
- **OpenAPI v3**, spec-first: the spec is written/updated before or with the route, not reverse-engineered later.
- The spec is **generated from typed route definitions** (e.g. zod-openapi / @asteasolutions/zod-to-openapi style), never hand-maintained YAML — the spec cannot drift from validation.
- Every route declares: request schema, success response schema, and error response shape.

## 4. Data & persistence

- **Drizzle** whenever there is an ORM-shaped problem (relational DB, migrations, typed queries).
- No ORM for read-only / sqlite-lite / one-table cases — plain SQL behind a dao-shaped module is fine; say so in the repo README.
- Migrations checked in, never applied by hand in prod.
- **Postgres** is the default relational engine unless there's a stated reason otherwise.
- **pglite** is the test database: in-memory Postgres with shared config/bootstrap (see §5).

## 5. Testing

- **vitest** (ruled 2026-09-20, replacing the earlier jest default — ESM-native, fast, no transform layer).
- Test files live in `test/` per package, mirroring source layout: `src/foo/bar.ts` → `test/foo/bar.test.ts`.
- **DB tests use pglite** (in-memory Postgres). Bootstrap the schema once per run; between tests **ALWAYS clean via `TRUNCATE`** — never teardown/rebuild the database per test. Same engine semantics as prod Postgres at a fraction of the cost.
- A production file is "covered" when a test imports it. Direct-import coverage is the minimum bar; the viz tests-slice shows gaps.
- Integration tests over real dependencies (containers/test DBs) where cheap; mocks at system boundaries only, never inside the repo's own layers.

## 6. Tooling & style

- **prettier** with a single shared config. Extracted into this repo as a publishable preset — prior art to harvest: `comfyops`, `slop-machine`, `spritebot`.
- **eslint** flat config, shared preset; per-repo extensions allowed, per-repo relaxations require a comment with a reason.
- Lint + format run in a pre-commit hook (lint-staged) and in CI. **Never bypass the hook.**
- Shared configs are published from this repo (`@unprofessional/...` or copied via the template) so upgrades propagate.

## 7. Config & environment

- Env vars loaded through a single typed config module (`src/config.ts`) that validates at startup and fails fast with a clear message. No scattered `process.env` reads.
- Secrets from the secret store (Infisical), never committed, never in `.env` files that are checked in.
- Every env var the repo reads appears in `.env.example` with a comment.

## 8. Error handling

- Services throw typed errors (error code + message + optional details); routes translate to HTTP status. No `res.status(500).send(String(err))`.
- One top-level async error boundary per entrypoint; no unhandled rejections.
- Log structured JSON at service boundaries; no `console.log` in production paths.

## 9. Repository hygiene

- Monorepo workspaces (npm) when a project has multiple packages; single package otherwise. Don't start monorepos "for later."
- README states: what it is, how to run, how to test, and any deviations from this standard with reasons.
- Git: trunk = `develop`, releases cut from it; conventional-commit-style messages; every non-trivial change lands via PR.
- Code written by dispatched coding agents follows this standard identically — dispatch briefs reference `STANDARD.md §N` instead of restating conventions.

## 10. Visualizer integration

- Every conforming repo wires `viz/` from this repo: `npm run viz` = analyze + build + serve.
- Because layout and naming are standardized (§2), the visualizer's heuristics need zero per-repo tuning: file names alone reveal the layer (`*.dao.ts`, `*.route.ts`), and the packages/api/tests slices come out legible for free.
- Non-conforming legacy repos still work (heuristics fall back to import analysis) but produce noisier graphs — that noise is itself the audit signal.

## 11. Deviations & evolution

- Deviations are allowed with a written reason in the repo README ("deviations" section). Undocumented deviation = audit finding.
- This standard evolves by PR to this repo. Breaking changes bump the version below and note migration steps.

**Version:** 0.2.0 · **Last changed:** 2026-09-20 (red-pen pass: no escape valve, vitest over jest, Fastify + generated OpenAPI, Postgres/pglite-TRUNCATE testing, shared configs from prior art)
