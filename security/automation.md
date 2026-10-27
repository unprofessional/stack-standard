# Dependency automation: separate platform boundary

[Security index](README.md) · [Response states](vulnerability-response.md)

## Current direction

**Mads and Claude are developing a separate security-focused platform** for automatic dependency detection and updating, with an interactive dashboard UI for internal administration. It is intended to replace much of the recurring manual inventory, triage and updating work.

This is work in progress, not a claim of deployed capabilities. Repository, delivery schedule and implementation belong to that project. This repo must not grow a parallel scanner, dashboard, job scheduler or credential service. Agents and existing pipelines continue applying these standards until platform capabilities are available and verified.

## Expected contract

The platform should track owners, support status, release baseline, dependency inventory, running artifact identity and observation time. Separate declared from installed dependencies and source scans from live checks. Inaccessible/unsupported targets remain visible rather than disappearing from coverage.

Updates must preserve [response states](vulnerability-response.md), advisory provenance, candidate/production distinction, checks and recovery evidence. Detection, proposed PR, validated artifact and deployed fix are different outcomes. A green dashboard must not erase missing evidence or exceptions.

## Automatic does not mean unrestricted

- Automatic inventory, advisory correlation and update proposals are initial policy expectations. Automatic production deployment requires explicit per-service policy.
- Define eligible changes, gates, maintenance constraints, rollback and stop conditions. Major migrations, custom images and absent upstream fixes require an owned decision.
- Authenticate and authorize admin UI actions server-side. Audit decisions, overrides and deployments; support reviewing, deferring with reason/date, and stopping rollouts.
- Separate scoped scanner, builder and deployer credentials. Do not expose raw private evidence or secret values by default.
- Prevent concurrent service updates, make retries idempotent and bind approvals/checks to the deployed artifact. Failed/canceled gates must not leave unnoticed deployments running.

## Manual-to-platform handoff

Use the [service profile](templates/service-profile.md), [change record](templates/change-record.md) and [exception record](templates/exception.md) until an integration schema is agreed. They describe required information, not a mandated database/API design. Link future integration docs after agreement with the platform owners; do not invent endpoints or duplicate its roadmap.
