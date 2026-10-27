# Deployment and recovery

[Security index](README.md) · [Change record](templates/change-record.md)

## Before production

Record exact artifact, process/service identity, mounts, arguments, device/resource settings, networking and restart behavior. Keep credential-bearing recreation settings private. Check whether stopping auto-removes the container; preserve the old image independently.

Determine active work and downtime impact. Health is not a job count. Honor authorization, maintenance constraints and exclusions; permission to deploy does not automatically authorize data loss.

## Backups and migrations

Use database-supported consistency or quiesce all relevant writers. A live SQLite file copy can omit WAL-backed changes. Its online backup API provides a consistent database copy but does not synchronize separate uploads/vector stores. [SQLite documentation](https://www.sqlite.org/backup.html)

Define the recovery unit: databases, files, object storage, config, keys and external state that must agree. Record time, access controls, integrity, encryption-key availability and restoration evidence. A listed backup is not a tested restore. Set acceptable data-loss/recovery-time objectives.

Rehearse on an isolated restored copy. Block copied credentials, jobs and integrations from contacting production; a different container name is insufficient. Validate schema, integrity, key counts and representative content/behavior. Counts alone do not prove semantic preservation.

Take a fresh consistent cutover backup if production kept changing. Rollback after migration may need data restoration plus the old image. Never assume an old application reads a new schema. State potential lost writes and preserve post-cutover data before destructive restoration.

## Cutover and acceptance

Deploy the tested artifact and preserve intended settings. Distinguish application overrides from old image defaults: copying obsolete build variables or discarding operator overrides both cause drift. Verify environment, device, mount and restart settings.

Check live version/digest, fixed dependency, readiness, restarts, auth boundary and representative function. Use benign synthetic jobs/images/inference, not real user actions with external consequences. An unauthenticated rejection is not a successful login test.

If validation fails, halt rollout and follow prepared recovery/containment. Preserve evidence; do not retry unrelated upgrades. Remove temporary candidates or explicitly label and stop retained ones.

Record untested behavior and remaining findings. Merged, built, rehearsed and deployed-and-verified are different states. Custom artifacts need reproducible recipes and a return-to-upstream trigger.
