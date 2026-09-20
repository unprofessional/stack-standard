# template

Planned: `degit`-able repo scaffold with the standard pre-wired.

Target contents:
- ESM + TS strict skeleton, package layout per STANDARD.md §1-2
- MDVC example entity (model/dao/service/route) with OpenAPI generation
- jest config + example test mirroring source layout
- shared prettier/eslint flat config
- typed `src/config.ts` env loader with fail-fast validation + `.env.example`
- `npm run viz` → analyze + build + serve via stack-standard's viz/
- pre-commit hook (lint-staged) preinstalled

Not started — STANDARD.md must settle first (v0.1 is draft).
