# Working on stack-standard

Read [STANDARD.md](STANDARD.md) and the [security index](security/README.md), then the guides relevant to the task. Agents and humans follow the same requirements.

- This repository uses `main`; work on a branch/worktree and submit a PR. Do not push directly to `main`.
- Keep standards in focused documents linked from their index. Update onboarding, audit and dispatch references when requirements change.
- Research technical claims against primary sources and record references/review dates. Separate house policy from vendor guarantees.
- This is a public repository: no private service inventories, hostnames, addresses, credentials, raw logs or backups. Review the staged diff and PR body before pushing.
- The dependency-security platform being developed by Mads and Claude is a separate project; follow [its boundary](security/automation.md). Do not implement its dashboard or updater here without a specific assignment.
- Validate relative Markdown links and run `git diff --check` for documentation changes. Run applicable existing checks for code changes; do not claim tests that were not run.
- Explain security-standard adoption steps and limitations; a standards change is not authorization to change deployed infrastructure.
