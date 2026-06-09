# 快速开始

本页面向第一次部署 LiteWaf 的用户，目标是在已安装 Docker Engine 和 Docker Compose v2 的 Linux 服务器上启动生产栈，并完成后台和网关验证。

## 前置条件

- 推荐 Debian 12 minimal，也兼容主流 Linux 发行版。
- Docker Engine 已安装，`docker compose version` 可正常输出。
- `80`、`443`、后台端口 `18080`、API loopback 端口 `18081` 以及后续要发布的应用监听端口未被占用。
- 当前用户可以执行 Docker 命令；非 root 用户按部署脚本提示使用 `sudo`。

## 一行部署

GitHub 入口：

```bash
bash -c "$(curl -fSL https://raw.githubusercontent.com/newz-max/litewaf-api/master/deploy/manager.sh)"
```

Gitee 入口：

```bash
bash -c "$(curl -fSL https://gitee.com/old_records/litewaf-api/raw/master/deploy/manager.sh)"
```

安装脚本会下载生产 Compose、环境变量模板和运维脚本到 `/opt/litewaf`，生成 `.env`，拉取预构建镜像并等待服务健康。

## 访问入口

| 服务 | 地址 | 说明 |
| --- | --- | --- |
| Dashboard | `http://服务器IP:18080` | 后台管理页面 |
| Gateway | 发布应用的监听端口 | OpenResty WAF 网关 |
| API | Dashboard `/api/` 反代 | 控制面 API |
| PostgreSQL | Compose 内部网络 | 配置、用户和日志存储 |
| Redis | Compose 内部网络 | 轻量运行状态 |

安装后可在服务器上查看后台账号和端口：

```bash
cd /opt/litewaf
sudo grep -E '^(DASHBOARD_PORT|GATEWAY_LISTENER_MODE|API_LOOPBACK_PORT|LITEWAF_ADMIN_USERNAME|LITEWAF_ADMIN_PASSWORD)=' .env
```

## 首次验证

1. 登录 Dashboard。
2. 创建站点并配置源站。
3. 添加或启用基础防护规则。
4. 发布当前配置。
5. 通过 Gateway 访问应用，确认正常请求被代理。
6. 发起一条可被规则命中的测试请求，确认 WAF 日志出现拦截记录。

::: warning 发布要求
站点、规则、策略、IP 名单、访问控制、限流和防护模块配置变更后，必须发布配置，Gateway 才会执行新版本。
:::

更多手动部署、GeoIP 和运维命令见 [Debian 12 部署](../deploy/debian12.md)。
