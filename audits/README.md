# audits

Per-repo assessments against `STANDARD.md`. One file per repo: `<repo>.md`.

Verdicts per section: **conforms** / **deviates** (with reason) / **grandfathered** (pre-standard, not worth migrating) / **worth migrating** (deviation causes real pain).

The bar is not "make old repos conform" — it's "new code holds the line, and we know exactly where the old code doesn't." The viz tool doubles as the audit instrument: non-conforming structure shows up as graph noise (orphans, layering inversions, uncovered files).

Security assessments use [security/](../security/README.md). Static structure and import coverage do not verify authorization, runtime patch status, reachability or restore behavior. Use **verified** / **finding** / **not assessed** / **not applicable (reason)** / **exception (owner + expiry)** for security rows. “Grandfathered” does not accept security risk. Keep populated private-service assessments outside this public repo unless explicitly approved and sanitized.

## Scorecard template

```markdown
# <repo> audit — <date>

| Area (§) | Verdict | Notes |
|---|---|---|
| ESM/runtime (1) | | |
| MDVC layering (2) | | |
| OpenAPI (3) | | |
| Data/Drizzle (4) | | |
| Testing/vitest (5) | | |
| Tooling (6) | | |
| Config/env (7) | | |
| Errors (8) | | |
| Hygiene (9) | | |
| viz wired (10) | | |

## Security (§12)

| Area | Status | Evidence / owner / next action |
|---|---|---|
| Service owner, scope, private reporting | | |
| Runtime/dependency inventory and pin alignment | | |
| Authentication, authorization and input boundaries | | |
| Secrets and evidence handling | | |
| CI trust, gates and release artifact identity | | |
| Container privileges and intended network exposure | | |
| TLS consumers and trust-store selection (if applicable) | | |
| Backup, restore, migration and rollback | | |
| Deployed verification and residual findings | | |
| Exceptions, expiry and automation integration status | | |

## Findings
## Recommendation
```

Use the [change record](../security/templates/change-record.md) for remediation and [exception record](../security/templates/exception.md) for accepted risk. Automation must report missing evidence rather than infer a pass from a file's presence.
