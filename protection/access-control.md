# 访问控制

访问控制用于按路径、Header 或 Host 对请求做允许、观察或阻断。来源 IP/CIDR 请使用独立的 IP 黑白名单模块。

## 适用场景

- 阻断后台路径、调试路径或内部接口。
- 只允许带有特定 Header 的请求访问灰度入口。
- 按 Host 后缀或精确域名限制访问范围。

## 后台入口

进入后台“访问控制”。选择目标类型、匹配方式、方法范围和动作。

## 推荐配置

| 场景 | 目标 | 匹配 | 动作 |
| --- | --- | --- | --- |
| 后台路径保护 | path `/admin` | `prefix` | `block` 或先 `log-only` |
| 单接口保护 | path `/internal/status` | `exact` | `block` |
| Header 校验 | header `X-Internal-Token` | `exact` 或 `contains` | `allow` / `block` |
| Host 限制 | host `example.com` | `exact` 或 `suffix` | `allow` / `block` |

## 匹配范围

路径匹配支持 `exact` 和 `prefix`。`exact` 要求路径完全一致。`prefix` 按路径段边界匹配，`/admin` 匹配 `/admin/users`，不匹配 `/admin2`。

Header 匹配读取指定 Header 名称，支持精确匹配或包含匹配。Host 匹配会忽略端口，支持精确域名或后缀域名。

方法为空表示全部 HTTP 方法。允许规则命中后请求继续代理；阻断规则命中后返回拒绝响应；观察规则只记录事件。

## 发布后生效

访问控制规则保存后必须发布新版本。Gateway 在 CC 防护之前执行访问控制，适合先处理明确的路径、Header、Host 规则。

## 验证方式

1. 发布观察模式，访问命中和未命中的路径。
2. 确认 `/admin` 命中时 `/admin2` 不误命中。
3. 切换阻断或允许动作并发布，确认响应变化。

## 日志排查字段

按 `module=access-control` 查询。重点查看 `target`、`rule_name`、`action`、`disposition` 和摘要。

## 误伤和风险

- 宽泛允许规则可能绕过后续模块，范围要尽量小。
- Header 值可能包含敏感信息，日志只保留有限摘要。
- 路径前缀不要用 `/` 直接阻断全站，除非已确认影响面。

