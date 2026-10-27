# TLS and trust stores

[Security index](README.md) · [Response](vulnerability-response.md)

## Verify the consumer

Keep certificate/hostname verification enabled. Never fix failures with insecure flags, `rejectUnauthorized: false` or global verification-disable settings. Private CAs need an explicit owned policy.

A retained root alone does not prove a compromised chain is accepted: a runtime may reject certificate/public-key identities elsewhere. Absence from one list does not prove absence from all trust sources. Consult the vendor fix and describe what each test establishes.

Inventory host OS, container, runtime-bundled and explicitly configured client stores separately. Include Java custom stores, browsers and subprocess clients. Changing the host does not automatically change image-owned stores; regeneration of one bundle may leave another stale. Identify the serving process, not just an executable on PATH, without dumping its environment.

Node supports multiple CA sources with version-specific behavior. Additional-CA mechanisms can extend rather than replace trust, and client-specific `ca` settings may change the result. Use the deployed runtime's documentation before designing a replacement bundle. [Node TLS](https://nodejs.org/api/tls.html)

## Test and lifecycle

Where justified, test permitted and specifically prohibited chains in isolation with the relevant client. A synthetic self-signed fixture demonstrates trust selection, not rejection of a real compromised intermediate. Record version, selected store and test scope.

Consider cached contexts, sessions and restart requirements. Updated disk contents do not prove process uptake. Record deferred restarts or missing chain tests rather than claiming verification.

Blanket root removal is broader than intermediate blocking and can break legitimate chains. Prefer the vendor-supported fix; a custom bundle requires a reason, compatibility tests, owner and rollback. Certificate policy and unrelated runtime upgrades remain distinct decisions.
