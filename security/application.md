# Application security

[Security index](README.md) · [Secrets](secrets-and-evidence.md)

These house controls complement MDVC and generated contracts. For deeper reviews, select applicable [OWASP ASVS](https://github.com/OWASP/ASVS) requirements and record the version/scope; this checklist alone is not ASVS verification.

## Access and boundaries

Document callers, sensitive data, integrations and privileged actions. Authenticate protected endpoints and authorize each operation against the resource and tenant. Deny by default; client-supplied owner/role fields are not authorization. Shared enforcement must cover routes, jobs and agent tools. Test cross-user/tenant denial as well as missing credentials.

Use maintained authentication/session libraries. Configure session cookies with appropriate Secure, HttpOnly and SameSite settings; address CSRF for cookie-authenticated state changes. CORS is not authorization. Restrict admin/debug interfaces, rate-limit expensive/auth operations and redact client-facing errors.

## Input and execution

Validate schemas, lengths and resource limits. Parameterize database queries and encode output for its destination. Avoid rendering untrusted HTML. Pass subprocess arguments structurally rather than interpolating shell strings; validate paths and arguments even without a shell.

Uploads need allowed formats, content validation, generated storage names and size limits. Filenames and MIME headers are not sufficient. Bound decompression, image dimensions/frame counts and processing time; isolate parsers and separate uploads from executable paths. A login does not remove decoder vulnerabilities. [OWASP uploads](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

For server-side URL fetching, constrain protocols, destinations, redirects and resolved addresses. Block unintended internal/metadata endpoints and account for DNS changes. Deliberate internal integrations need explicit destinations and scoped credentials. [OWASP SSRF](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)

## Integrations and agent features

Verify webhook signatures over the correct payload and prevent replay where supported. Bound retries and make repeated state changes idempotent. Use timeouts, cancellation and quotas for jobs, uploads and inference.

An agent tool is an API: authorize its actual action/resource, validate generated arguments and keep secrets outside model-visible text. Retrieved content cannot grant additional tool privileges. High-impact operations use the same control path regardless of caller type.

## Verification

For changed boundaries, include allowed, denied and relevant abuse-limit cases. Test authorization below the route as well as through HTTP. Health checks and benign image decoding do not prove login, tenant isolation or every parser path. State exactly what was exercised.
