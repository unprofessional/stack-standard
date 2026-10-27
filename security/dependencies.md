# Dependencies and runtimes

[Security index](README.md) · [CI](ci-and-supply-chain.md) · [Response](vulnerability-response.md)

## Inventory and selection

Use maintained upstreams and supported runtime lines. Record runtime, package manager, application revision, image digest, update mechanism and owner in the [service profile](templates/service-profile.md). Include workers, build stages, native libraries and subprocess tools where applicable.

Tie findings to the inspected interpreter/artifact. Host packages do not inventory containers or virtual environments. No executable on PATH does not mean no installation anywhere. State exclusions.

Verify affected ranges and fixes against vendor/distribution advisories, including backports. A merged PR, development pin, release manifest and installed package are distinct evidence. Verify the artifact intended for deployment.

## Align all runtime declarations

| Surface | Review together |
|---|---|
| Local tools | `.nvmrc`, `.node-version`, `.tool-versions` or equivalents |
| Metadata | `engines`, `packageManager`, root/workspace manifests and lock metadata |
| Package manager | `.npmrc` strictness, registry and install flags; no credentials committed |
| Images | Every relevant builder/runtime stage and target architecture |
| Automation | Actions, Jenkins tools, build agents, remote scripts and migration executable paths |
| Operations | Compose/service units, setup instructions and deployment documentation |

Ranges and exact pins need not be identical strings, but must permit the tested runtime without claiming untested support. Never rewrite third-party engines to force compatibility. Use lockfile-preserving installs in CI; `npm ci` rejects manifest/lock disagreement and needs compatible install flags. [npm documentation](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

## Update rules

- Prefer a compatible fixed release over unrelated major upgrades. If only a major release fixes the issue, document/test the required migration; do not blindly force-upgrade.
- Separate production and development findings. Build tools execute code and may reach credentials; “dev-only” is not automatic dismissal.
- Rebuild an artifact rather than modifying a running container as the lasting fix.
- Compare before/after inventories for narrow patches. Explain unexpected changes and keep pre-existing conflicts visible.
- Record chosen versions and evidence dates in consuming repositories; this standard is not a permanently frozen version-floor list.

## Temporary derived images

A derived Docker image is **not a source fork** unless source is forked. When an official fixed image is unavailable, require a versioned Dockerfile, exact base digest, locked or hash-verified added packages, compatibility tests, owner and review/removal trigger. Label it custom, preserve rollback and plan a return to a suitable official artifact.

Successful installation alone does not prove compatibility. Any deliberate dependency override, including `--no-deps`, needs before/after checks and an [exception](templates/exception.md) where constraints remain unmet. Managed appliances use supported update mechanisms or a separately reviewed custom-deployment plan.
