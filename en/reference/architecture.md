# Architecture

LiteWaf consists of the control plane, management UI, data-plane gateway, and state services.

## Component Boundaries

| Component | Technology | Responsibility |
| --- | --- | --- |
| API | Go standard library | Authentication, configuration management, publishing, log queries, backup/restore, and version information |
| Dashboard | Vue 3 + TypeScript + Vite + Naive UI | Administration, configuration editing, publish preview, and observability pages |
| Gateway | OpenResty + LuaJIT | Proxying, lists, rate limits, rule detection, blocking, and async logs |
| PostgreSQL | PostgreSQL | Configuration, users, roles, audit records, logs, and statistics |
| Redis | Redis | Lightweight runtime state and counter assistance |

## Configuration Flow

1. A user saves configuration in the Dashboard.
2. The Dashboard calls the `/api/v1` management API.
3. The API writes to the database and generates a publish preview.
4. The user confirms publishing.
5. The API generates versioned gateway configuration.
6. The Gateway pulls or refreshes local configuration and enforces it in the request path.
7. The Gateway emits access logs and WAF events, which the API aggregates for dashboard queries.

## Request Path

The Gateway hot path does not access a remote database. Blacklists, whitelists, static assets, health checks, and unrelated requests short-circuit first; request body inspection and upload metadata inspection are enabled by configuration.

More detailed boundary notes are available in [`litewaf-api/doc/架构说明.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/%E6%9E%B6%E6%9E%84%E8%AF%B4%E6%98%8E.md).
