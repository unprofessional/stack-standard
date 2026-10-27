# Security change record template

[Security index](../README.md). Sanitize before sharing; raw evidence stays private.

## Scope and decision

- Identifier, date, owner, authorizing request/policy:
- Problem/advisory, primary references and checked date:
- In-scope services, exclusions and stopping point:
- Affectedness/input reachability evidence and uncertainties:
- [Response state](../vulnerability-response.md):
- Proposed change, prerequisites and alternatives:
- Release baseline reconciliation/approved divergence:

## Execution and evidence

- Before/after commits, runtime versions and image digests:
- Runtime pins/config/lockfile alignment:
- Package delta, existing versus new findings:
- Required gates, exact tested revision, commands/job links:
- Each result: passed / failed / skipped / blocked / not applicable, with reason:
- Backup consistency/integrity, restore/rehearsal evidence, private record ID:
- Rollback procedure, retained artifacts and potential lost writes:
- Deployment time/identity and intentional launch-setting changes:
- Production checks: health, authentication, function and fixed dependency:
- Network test vantage point, if relevant:

## Current conclusion

- Observations versus inferences; untested behavior:
- Deferred work, exceptions and corrected/superseded claims:
- Custom artifact versus source fork; owner and upstream exit trigger:
- Next owner, action and review date:
- Temporary resources retained/stopped/removed; evidence retention:

Do not mark deployed when only built, login-tested when only a 401 was observed, or restore-tested when only a backup was listed.
