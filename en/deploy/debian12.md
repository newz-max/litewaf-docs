# Debian 12 Deployment

LiteWaf recommends Debian 12 minimal as the host baseline while remaining compatible with mainstream Linux distributions that support Docker Compose v2.

## Deployment Model

- API, Dashboard, Gateway, PostgreSQL, and Redis run through Docker Compose.
- API logs are written to stdout.
- PostgreSQL, Redis, and gateway data use persistent volumes.
- Gateway uses host networking by default to listen on published application ports.
- The install script checks the environment, downloads Compose files, generates `.env`, pulls images, and starts containers. It does not build services on the host.

## Common Commands

```bash
cd /opt/litewaf

sudo ./litewafctl.sh health
sudo ./litewafctl.sh diagnose
sudo ./litewafctl.sh backup
sudo ./litewafctl.sh upgrade latest
sudo ./litewafctl.sh rollback
```

Inspect services:

```bash
sudo docker compose -p litewaf --env-file .env -f docker-compose.prod.yml ps
```

Inspect logs:

```bash
sudo docker compose -p litewaf --env-file .env -f docker-compose.prod.yml logs -f gateway
sudo docker compose -p litewaf --env-file .env -f docker-compose.prod.yml logs -f waf-api
```

## Port Notes

In production mode, the Gateway must bind the host ports used by published applications. If `80` or `443` is already owned by Nginx, Apache, Caddy, BaoTa OpenResty, or another service, installation or publishing can fail. Check port ownership first, then choose whether to free the ports or use another topology.

Detailed deployment notes are available in [`litewaf-api/doc/Debian12部署说明.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/Debian12%E9%83%A8%E7%BD%B2%E8%AF%B4%E6%98%8E.md).
