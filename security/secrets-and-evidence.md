# Secrets and evidence

[Security index](README.md) · [Agent workflow](agent-workflow.md)

## Credentials

Use Infisical with identities scoped to required project, environment, paths and operations. Prefer short-lived credentials where supported; distinguish read, build and deployment identities. Record rotation/revocation ownership. These defaults follow [OWASP secrets guidance](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html).

Never commit tokens, passwords, private keys, real `.env` files or registry credentials. `.env.example` contains names and dummy values only. Use protected input mechanisms rather than command-line arguments, shell tracing or report output. Masking is a fallback, not permission to print secrets. If disclosure occurs, revoke/rotate and assess use; deleting output is not remediation.

## Minimize collection

Prefer versions, field names, counts and status codes over complete configuration or user records. Container inspection, process environments, logs, database copies and dumps can contain secrets. Necessary raw evidence needs restricted access, suitable encryption, an owner and retention/deletion date. Preserve hashes when integrity matters.

A rehearsal with copied production data still contains production secrets. Remove/replace credentials where practical and block outbound traffic/scheduled side effects. Environment flags alone may not override database-configured integrations.

| Public repository may contain | Keep restricted |
|---|---|
| Generic standards and synthetic examples | Internal hostnames/IPs and live topology |
| Public advisories and approved disclosure details | Unreleased findings and exploit evidence |
| Secret-free recipes and sanitized test summaries | Raw configs, credentials, backups and user data |

Review the staged diff and PR body before publication. Scanners cannot recognize all internal identifiers. Refer to private evidence by a safe identifier rather than copying it here.

## Access recovery

Document how authorized operators obtain credentials, not the values. Reconstruct missing helpers from the approved secret-store procedure; do not expand privileges to solve a tooling failure. If access actually fails, state the missing capability and complete unaffected work.
