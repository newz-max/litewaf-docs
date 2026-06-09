# Upgrade and Rollback

LiteWaf production deployments use prebuilt images and `litewafctl.sh` for upgrade, rollback, backup, and restore operations.

## Upgrade

Upgrade to the latest image:

```bash
cd /opt/litewaf
sudo ./litewafctl.sh upgrade latest
```

Upgrade to a specific version:

```bash
cd /opt/litewaf
sudo ./litewafctl.sh upgrade v1.0.1
```

Back up before upgrading:

```bash
sudo ./litewafctl.sh backup
```

## Rollback

```bash
cd /opt/litewaf
sudo ./litewafctl.sh rollback
```

After rollback, verify service health, Dashboard login, publish records, Gateway proxying, and WAF logs.

## Version Source

The root `VERSION` file is the release version source. The image publishing script reads this version and publishes API, Dashboard, and Gateway image tags.

Image publishing details are available in [`litewaf-api/doc/镜像发布说明.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/%E9%95%9C%E5%83%8F%E5%8F%91%E5%B8%83%E8%AF%B4%E6%98%8E.md).
