# template

Planned: `degit`-able repo scaffold with the standard pre-wired.

Target contents:
- ESM + TS strict skeleton, package layout per STANDARD.md §1-2
- MDVC example entity (model/dao/service/route) on Fastify with generated OpenAPI
- vitest config + example test mirroring source layout, pglite bootstrap with TRUNCATE-based cleanup
- shared prettier/eslint flat config
- typed `src/config.ts` env loader with fail-fast validation + `.env.example`
- `npm run viz` → analyze + build + serve via stack-standard's viz/
- pre-commit hook (lint-staged) preinstalled

Not started — waiting on the shared config presets (prettier/eslint extraction from comfyops/slop-machine/spritebot).
