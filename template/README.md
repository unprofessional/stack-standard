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
- README/agent-instruction links to [security/](../security/README.md), a service security profile, private reporting instructions and the applicable CI/security gates from §12

This scaffold must consume the security requirements; it must not implement the [separate dependency automation platform](../security/automation.md).

Not started — waiting on the shared config presets (prettier/eslint extraction from comfyops/slop-machine/spritebot).
