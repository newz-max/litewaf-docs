# API Overview

The LiteWaf management API uses the `/api/v1` prefix and JSON responses. The Dashboard uses this API to manage sites, rules, policies, publishing, logs, observability, and system settings.

## Authentication

- The login endpoint returns a Bearer token.
- Management endpoints enforce role-based permissions.
- Audit logs record important changes.

## Resource Scope

| Resource | Description |
| --- | --- |
| Sites and listeners | Hosts, protocols, ports, origins, and certificate bindings |
| Rules and policies | Detection targets, expressions, actions, scores, and thresholds |
| Publishing | Publish preview, publish records, and version rollback |
| IP lists and access control | Standalone IP blacklist/whitelist, access control, and rate limit configuration |
| Logs and observability | Access logs, attack logs, reports, and metrics |
| Operations | Health checks, version, backup, and restore |

## Integration Guidance

Integrators should follow the sequence "save configuration -> preview publish -> publish -> validate logs". Saving configuration alone does not change the Gateway's active execution version.

Full API fields and examples are available in [`litewaf-api/doc/API文档.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/API%E6%96%87%E6%A1%A3.md).
