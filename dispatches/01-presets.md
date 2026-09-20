# Dispatch 01 — shared config presets

## Goal

Create the publishable shared config package(s) that STANDARD.md §6 promises: prettier, eslint (flat config), and base tsconfig presets, harvested from prior art rather than invented.

## Prior art (read-only reference — do NOT modify these repos)

Local checkouts on yharnam (ask operator for paths if missing):
- `slop-machine` — most mature; monorepo workspaces, prettier + lint-staged pre-commit
- `comfyops`
- `spritebot`

For each: collect `.prettierrc*`, `eslint.config.*` / `.eslintrc*`, `tsconfig*.json`, lint-staged/husky config. Note where they agree (that's the preset) and disagree (pick a winner, justify in PR description).

## Deliverables

- `presets/` directory at repo root, npm-workspaces-style:
  - `presets/prettier-config/` — package exporting the shared prettier config
  - `presets/eslint-config/` — flat-config preset (`eslint.config.mjs`-importable), TS + ESM baseline per STANDARD §1
  - `presets/tsconfig/` — base `tsconfig.json` (strict, NodeNext ESM) with documented extension points
- Each package: `package.json` with correct `exports`, README with one-paragraph usage, and a smoke test (a fixture file that the config lints/formats deterministically).
- Naming: `@stack-standard/prettier-config` etc. for now (rename-on-publish is a one-liner later; note the final scope decision as an open question in the PR, do not block on it).
- Update `STANDARD.md` §6 to point at `presets/` instead of "to be extracted". Do not change any other section's substance.

## Constraints

- vitest for the smoke tests (STANDARD §5).
- No runtime dependencies unless a config genuinely requires them (eslint plugins count as deps — keep the plugin set minimal and justified).
- Determinism: same input → same formatted/lint output across machines; pin plugin versions with exact (`^` acceptable only for eslint core plugins — justify any choice).

## Definition of done

- `npm install && npm test` green from a clean clone.
- Running the presets against a copy of one prior-art repo's files produces no crashes and a sane diff (attach summary to PR).
- PR to `main` with the justification notes above.
