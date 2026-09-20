# Codex dispatch queue

Self-contained briefs for dispatched coding-agent work against this repo. Each is written to be handed to a fresh Codex session verbatim.

Conventions for all dispatches:
- Work in a disposable git worktree cut from `main`; PR back to `main`. Never push directly.
- Follow `STANDARD.md` — it is the subject of this repo, deviations need justification in the PR description.
- Commits carry mads's identity (Unprofessional <unprofessionalmadman@gmail.com>) by design.
- Do not read/write outside the designated worktree.
- PR description: what changed, how verified (commands + output summary), any STANDARD.md sections touched.

| # | Brief | Depends on | Status |
|---|---|---|---|
| 01 | [presets.md](01-presets.md) — harvest shared prettier/eslint/tsconfig presets | — | queued |
| 02 | [template.md](02-template.md) — build the repo scaffold | 01 | queued |
| 03 | [audits.md](03-audits.md) — audit instrument + first scorecards | 01 | queued |

Status values: queued → dispatched → in-review → merged. Update this table in the PR that finishes the work.
