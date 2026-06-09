# 升级和回滚

LiteWaf 的生产部署通过预构建镜像和 `litewafctl.sh` 完成升级、回滚和备份恢复。

## 升级

升级到最新镜像：

```bash
cd /opt/litewaf
sudo ./litewafctl.sh upgrade latest
```

升级到指定版本：

```bash
cd /opt/litewaf
sudo ./litewafctl.sh upgrade v1.0.1
```

升级前建议先执行备份：

```bash
sudo ./litewafctl.sh backup
```

## 回滚

```bash
cd /opt/litewaf
sudo ./litewafctl.sh rollback
```

回滚后应检查服务健康、Dashboard 登录、发布记录、Gateway 代理和 WAF 日志。

## 版本来源

项目根 `VERSION` 是发布版本来源，镜像发布脚本会读取该版本并发布 API、Dashboard 和 Gateway 镜像标签。

镜像发布细节见 [`litewaf-api/doc/镜像发布说明.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/%E9%95%9C%E5%83%8F%E5%8F%91%E5%B8%83%E8%AF%B4%E6%98%8E.md)。
