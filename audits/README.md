# audits

Per-repo assessments against `STANDARD.md`. One file per repo: `<repo>.md`.

Verdicts per section: **conforms** / **deviates** (with reason) / **grandfathered** (pre-standard, not worth migrating) / **worth migrating** (deviation causes real pain).

The bar is not "make old repos conform" — it's "new code holds the line, and we know exactly where the old code doesn't." The viz tool doubles as the audit instrument: non-conforming structure shows up as graph noise (orphans, layering inversions, uncovered files).

## Scorecard template

```markdown
# <repo> audit — <date>

| Area (§) | Verdict | Notes |
|---|---|---|
| ESM/runtime (1) | | |
| MDVC layering (2) | | |
| OpenAPI (3) | | |
| Data/Drizzle (4) | | |
| Testing/jest (5) | | |
| Tooling (6) | | |
| Config/env (7) | | |
| Errors (8) | | |
| Hygiene (9) | | |
| viz wired (10) | | |

## Findings
## Recommendation
```
