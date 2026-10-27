# Research and maintenance

[Security index](README.md)

Reviewed **2026-10-27**. Primary references inform these house requirements; they do not certify deployments. Read the actual vendor/build advisory for each finding. No incident-specific CVE inventory or frozen fixed-version list belongs here.

| Reference | Purpose |
|---|---|
| [NIST SSDF](https://csrc.nist.gov/projects/ssdf) | Lifecycle: prepare, protect, produce and respond, beyond scanning |
| [OWASP ASVS](https://github.com/OWASP/ASVS) | Select verifiable application controls for deeper reviews |
| [OWASP uploads](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) | Untrusted files and parser boundaries |
| [OWASP SSRF](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) | Destination validation |
| [OWASP secrets](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) | Credential scoping and lifecycle |
| [GitHub Actions](https://docs.github.com/en/actions/reference/security/secure-use) | Untrusted code, permissions, immutable references |
| [GitHub advisories](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/fix-reported-vulnerabilities/create-repository-advisory) | Private coordination |
| [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/) | Lockfile-consistent installs |
| [Docker builds](https://docs.docker.com/build/building/best-practices/) | Base images, stages and release identity |
| [Docker firewalls](https://docs.docker.com/engine/network/packet-filtering-firewalls/) | Network paths and UFW interaction |
| [Docker iptables](https://docs.docker.com/engine/network/firewall-iptables/) / [nftables](https://docs.docker.com/engine/network/firewall-nftables/) | Backend-specific policy placement |
| [Node TLS](https://nodejs.org/api/tls.html) | Trust source selection |
| [SQLite backup](https://www.sqlite.org/backup.html) | Consistent database copies and limits |

Change requirements by PR, identify affected controls, recheck relevant sources and record migration guidance. Revisit after tooling changes or incidents expose mistaken assumptions. Forum reports can locate useful upstream work; independently verify merge, release and installed-artifact status.
