# Debian 12 部署

LiteWaf 默认推荐 Debian 12 minimal 作为宿主机基线，同时保持对主流 Linux + Docker Compose v2 的兼容。

## 部署模型

- API、Dashboard、Gateway、PostgreSQL 和 Redis 通过 Docker Compose 启动。
- API 日志输出到 stdout。
- PostgreSQL、Redis 和网关数据挂载持久化 volume。
- Gateway 默认使用 host-network 监听发布后的业务端口。
- 安装脚本只做环境检查、下载 Compose、生成 `.env`、拉取镜像和启动容器，不在宿主机现场编译服务。

## 常用命令

```bash
cd /opt/litewaf

sudo ./litewafctl.sh health
sudo ./litewafctl.sh diagnose
sudo ./litewafctl.sh backup
sudo ./litewafctl.sh upgrade latest
sudo ./litewafctl.sh rollback
```

查看服务：

```bash
sudo docker compose -p litewaf --env-file .env -f docker-compose.prod.yml ps
```

查看日志：

```bash
sudo docker compose -p litewaf --env-file .env -f docker-compose.prod.yml logs -f gateway
sudo docker compose -p litewaf --env-file .env -f docker-compose.prod.yml logs -f waf-api
```

## 端口注意事项

生产模式下 Gateway 需要绑定发布应用使用的宿主机端口。若 `80` 或 `443` 已被 Nginx、Apache、Caddy、宝塔 OpenResty 或其他服务占用，安装或发布会失败，应先确认端口归属再决定释放端口或选择其他拓扑。

详细部署说明见 [`litewaf-api/doc/Debian12部署说明.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/Debian12%E9%83%A8%E7%BD%B2%E8%AF%B4%E6%98%8E.md)。
