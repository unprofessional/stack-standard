# CI and supply chain

[Security index](README.md) · [Dependencies](dependencies.md) · [Deployment](deployment-and-recovery.md)

## Build trust

Dependency installation and build scripts execute code. Review new sources, lockfile changes and lifecycle scripts. Record source commit, lockfile identity and produced artifact digest. Generate an SBOM or equivalent release inventory including relevant OS/native packages. A digest identifies bytes; publisher/source verification is separate.

GitHub Actions must minimize token permissions and pin third-party actions to full commit SHAs. Do not run untrusted PR code with production secrets or privileged target workflows. Treat PR/branch metadata as untrusted input rather than shell source. Isolate self-hosted runners from untrusted contributions and deployment credentials. [GitHub secure use](https://docs.github.com/en/actions/reference/security/secure-use)

Equivalent controls apply to Jenkins and other systems. Docker socket access and deployment keys make build agents privileged. Separate untrusted tests from release jobs; prefer disposable environments and scoped credentials.

## Release gates

Each repo must declare required checks: applicable formatting/lint/types, meaningful tests, dependency/image scans and integration smoke. Missing/skipped checks are not passed.

When provider outages or quotas block CI, an authorized owner may accept equivalent checks elsewhere. Record exact commit, environment, commands, results, missing coverage and decision. Do not remove gates or globally lower thresholds. Vulnerability exceptions are [owned and expiring](templates/exception.md).

## Failures stop deployment

- Propagate errors through SSH wrappers, migrations and deploy plugins. “Unstable” does not satisfy a required gate.
- Use syntax supported by the invoked shell; `/bin/sh` is not necessarily Bash. Check pipeline exit status rather than only its last command.
- Package migration/build tools deliberately. Production-only installs may omit necessary tooling; use a controlled job with explicit dependencies.
- Promote the tested artifact by immutable identity. If rebuilding is necessary, revalidate that result and record why.
- Separate PR validation from production deployment. A test run must not implicitly deploy an old release branch.

The [planned platform](automation.md) may orchestrate these gates, but must preserve their semantics and evidence.
