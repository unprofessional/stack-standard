# Security standard

Part of [STANDARD.md §12](../STANDARD.md). Applies equally to humans and coding agents. These are house requirements informed by [primary sources](sources.md), not a claim of external certification.

**Must** is required for applicable new or changed work. **Should** is the default unless a documented reason supports another approach. Legacy gaps become owned findings, not permission to rewrite unrelated systems. Record unmet requirements as [exceptions](templates/exception.md) with an owner and review date.

## Find the right guide

| Task | Guide |
|---|---|
| Start an agent assignment | [Agent workflow](agent-workflow.md) |
| Investigate or update a package/runtime | [Dependencies](dependencies.md) |
| Add an API, upload or integration | [Application security](application.md) |
| Use credentials or collect evidence | [Secrets and evidence](secrets-and-evidence.md) |
| Change build/deployment pipelines | [CI and supply chain](ci-and-supply-chain.md) |
| Build containers or publish ports | [Containers and networking](containers-and-network.md) |
| Investigate certificate trust | [TLS and trust stores](tls-and-trust.md) |
| Release a fix or migrate data | [Deployment and recovery](deployment-and-recovery.md) |
| Triage an advisory or close a finding | [Vulnerability response](vulnerability-response.md) |
| Integrate the planned dependency platform | [Automation boundary](automation.md) |

## Adoption

New repositories must link this index from their README and agent instructions, identify a security owner/private reporting route, and maintain a [service profile](templates/service-profile.md). Existing repositories adopt controls when the relevant surface changes; record remaining gaps without claiming conformance.

Use the [change record](templates/change-record.md) for security work. A valid outcome can be no change: the advisory may not apply, the fix may already be installed, or upstream may not have released it. Record evidence and a next review rather than manufacturing work. See the [audit scorecard](../audits/README.md).

## Separate platform in progress

**Mads and Claude are working on a separate security-focused platform for automatic dependency detection and updating, with a dashboard UI and interactive controls for internal administration.** Its purpose is to reduce recurring manual inventory and update work. It is not implemented by this repository; its delivery date, repository and operational guarantees are not specified here.

These documents define the policy and evidence that manual work and that platform should share. See [automation.md](automation.md). Do not build a competing scanner, dashboard or update service as an incidental task here.

## Enforcement status

This change adds documented requirements and templates, not automated enforcement. CI presets, scaffold generation and the audit runner remain queued in [dispatches](../dispatches/README.md). Until implemented, reviewers must assess the relevant controls manually and mark missing evidence honestly. No repository settings, branch protections or private vulnerability reporting have been enabled by these documents.
