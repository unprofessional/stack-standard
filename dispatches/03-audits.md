# Dispatch 03 — audit instrument + first scorecards

Depends on: Dispatch 01 (presets referenced by audit checks). Coordinate with operator before dispatch — repo access list below includes PRIVATE repos.

## Goal

Turn `audits/` from a template into a repeatable instrument: a checklist runner + the first real scorecards.

## Deliverables

1. `audits/checklist.mjs` — a script that, given a repo path, mechanically answers the automatable audit questions and prints a scorecard skeleton:
   - ESM-only (`"type": "module"`, no CJS patterns in src)
   - TS strictness flags present
   - test runner identity (vitest/jest/other) + test file placement convention
   - MDVC conformance: for files matching `*.dao.ts`/`*.service.ts`/`*.route.ts`/`*.model.ts`, check layering direction heuristically (route imports service, service imports dao, dao imports model; flag upward/skip imports). Report repos with no MDVC naming as "pre-standard layout" rather than failing them.
   - env hygiene: scattered `process.env` reads outside a config module, `.env.example` presence, committed `.env` files (flag as finding)
   - prettier/eslint config presence + whether they match the shared presets
   - viz compatibility: does `viz/analyze.mjs` run clean against it
   - Output: markdown table per audits/README.md template + a findings list. Non-zero exit only for hard findings (committed secrets/.env), warnings otherwise.
2. First scorecards (run the checklist, then add human judgment in the Findings/Recommendation sections):
   - `audits/template.md` — audit the Dispatch-02 template itself; must be a clean pass or the checklist is wrong.
   - Scorecards for private repos (price-checker, slop-machine, spritebot, comfyops) are produced LOCALLY and delivered to the operator first — **do NOT commit audits of private repos to this public repo** without explicit operator approval. The public repo carries only the checklist, the template audit, and approved scorecards.

## Constraints

- The checklist must never crash on non-conforming/legacy repos — "deviates/pre-standard" is data, not an error.
- No network access in the checklist; pure static analysis.
- vitest for the checklist's own tests (§5) with fixture repos under `audits/test/fixtures/` (tiny synthetic repos, one per verdict shape).

## Definition of done

- `node audits/checklist.mjs <template-dir>` produces the expected clean scorecard.
- Fixture tests green (`npm test` at repo root or audits workspace).
- PR to `main` containing checklist + fixtures + template audit only; private scorecards delivered out-of-band.
