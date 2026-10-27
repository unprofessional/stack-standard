# Containers and network exposure

[Security index](README.md) · [Deployment](deployment-and-recovery.md)

## Build and execution

Use trusted maintained bases, minimal runtime contents and separate build stages. Pin release/base inputs by digest and maintain updates; a pin does not make an old image safe. Rebuild instead of editing live containers. [Docker build guidance](https://docs.docker.com/build/building/best-practices/)

House defaults: non-root, no privileged mode/host Docker socket, only required capabilities/mounts, resource limits and read-only filesystems where practical. Record justified device/GPU, host-network and writable-mount needs. Keep secrets out of layers/build arguments; use supported build-secret facilities. Scan the resulting image, not only manifests.

## Reachability

Document each published port's purpose, callers, address families, auth and proxy/VPN path. Prefer no publishing for internal services and loopback for host-local consumers. A LAN-address bind limits destinations, not client sources. A reachable status endpoint does not prove access to protected data.

Docker bridge traffic may bypass the UFW INPUT path an operator expects. Host networking differs. Inspect actual paths; do not disable Docker firewall management as a quick fix. [Docker firewall behavior](https://docs.docker.com/engine/network/packet-filtering-firewalls/)

Identify the backend before adding policy. With iptables, `DOCKER-USER` precedes Docker forwarding accepts; DNAT has occurred, so original destination matching may require conntrack. Native nftables has a different policy model, not a portable `DOCKER-USER` recipe. Never flush unrelated or Docker-managed policy. [iptables](https://docs.docker.com/engine/network/firewall-iptables/) · [nftables](https://docs.docker.com/engine/network/firewall-nftables/)

## Verification and safe changes

Check IPv4/IPv6 independently, including proxies and direct container routing. “Scope global” may label a private ULA address. Disabled IPv4 forwards do not prove IPv6 closure. Distinguish host/gateway policy from an actual off-network test.

Trace VPN routing and SNAT before restricting clients: traffic may arrive as a tunnel address or the gateway's LAN address. Source filtering cannot distinguish arbitrary traffic translated by a gateway to an allowed source. Retain authentication and gateway controls.

Infrastructure changes require their own scope; dependency work must not silently become general firewall hardening. Preserve recovery access and current policy, add targeted rules, test permitted/denied traffic and check other services. Label simulated-source tests as such; they are not Internet tests.

Persistence must account for boot, Docker restart and firewall reload. Test idempotence and state unexercised scenarios. A failing required startup hook can fail service startup. Maintain rules when interfaces/addresses change. Put deployment-specific rules in the infrastructure repo, not universal commands here.
