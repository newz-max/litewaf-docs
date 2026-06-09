# Quick Start

This page is for first-time LiteWaf deployments. The goal is to start the production stack on a Linux server with Docker Engine and Docker Compose v2, then validate both the dashboard and the gateway.

## Prerequisites

- Debian 12 minimal is recommended. Other mainstream Linux distributions are also supported when Docker Engine and Docker Compose v2 are available.
- `docker compose version` works on the target host.
- Ports `80`, `443`, dashboard port `18080`, API loopback port `18081`, and any application listener ports you plan to publish are available.
- The current user can run Docker commands. Non-root users should follow the install script prompts for `sudo`.

## One-Line Deployment

GitHub entry:

```bash
bash -c "$(curl -fSL https://raw.githubusercontent.com/newz-max/litewaf-api/master/deploy/manager.sh)"
```

Gitee entry:

```bash
bash -c "$(curl -fSL https://gitee.com/old_records/litewaf-api/raw/master/deploy/manager.sh)"
```

The installer downloads the production Compose file, environment template, and operations script into `/opt/litewaf`, generates `.env`, pulls prebuilt images, and waits for service health.

## Access Points

| Service | Address | Notes |
| --- | --- | --- |
| Dashboard | `http://SERVER_IP:18080` | Web administration UI |
| Gateway | Published application listener port | OpenResty WAF gateway |
| API | Dashboard `/api/` reverse proxy | Control plane API |
| PostgreSQL | Compose internal network | Configuration, users, and logs |
| Redis | Compose internal network | Lightweight runtime state |

After installation, inspect the generated dashboard account and ports on the server:

```bash
cd /opt/litewaf
sudo grep -E '^(DASHBOARD_PORT|GATEWAY_LISTENER_MODE|API_LOOPBACK_PORT|LITEWAF_ADMIN_USERNAME|LITEWAF_ADMIN_PASSWORD)=' .env
```

## First Validation

1. Log in to the Dashboard.
2. Create a site and configure the origin.
3. Add or enable baseline protection rules.
4. Publish the current configuration.
5. Access the application through the Gateway and confirm normal requests are proxied.
6. Send a request that matches a test rule and confirm the WAF log records a blocked event.

::: warning Publish required
After changing sites, rules, policies, IP lists, access control, rate limits, or protection modules, publish the configuration before expecting the Gateway to enforce the new version.
:::

For manual deployment, GeoIP, and operations commands, see [Debian 12 Deployment](../deploy/debian12.md).
