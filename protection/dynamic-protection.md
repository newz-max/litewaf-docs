# 动态防护 / 等候室

动态防护包含动态令牌、页面动态化和本地等候室。所有判断都基于发布后的本地配置和 Gateway shared dict，不在请求热路径访问控制面数据库。

## 适用场景

- 为后台、活动页等浏览器路径签发短期动态令牌。
- 对小体积 HTML 响应注入受控标记。
- 在高峰活动入口使用本地等候室限制并发准入。

## 后台入口

进入后台“动态防护 / 等候室”。选择规则类型、路径范围、TTL、失败动作或等候室容量。

## 推荐配置

| 场景 | 类别 | 路径 | 匹配 | 建议 |
| --- | --- | --- | --- | --- |
| 后台令牌 | `dynamic-token` | `/admin` | `prefix` | cookie 模式，TTL 约 300 秒 |
| 活动页动态化 | `page-mutation` | `/campaign` | `prefix` | 限制 HTML 最大缓冲大小 |
| 秒杀入口 | `waiting-room` | `/sale` | `prefix` | 小范围、短 TTL、先观察 |

## 匹配范围

动态防护路径支持 `exact` 和 `prefix`。方法为空表示全部方法。`prefix` 按路径段边界处理，`/admin` 不匹配 `/admin2`。

动态令牌支持 cookie、header、query 放置方式。页面动态化只处理 `Content-Type` 包含 `text/html` 且不超过大小上限的响应。等候室状态是本地节点状态，多 Gateway 实例下不保证全局精确公平。

## 发布后生效

保存动态防护规则后必须发布新版本。Gateway 在 Bot 判断之后、攻击防护之前执行动态防护。

## 验证方式

1. 发布窄路径观察规则。
2. 对动态令牌路径访问两次，确认签发和通过。
3. 对页面动态化路径确认 HTML 注入或安全跳过。
4. 对等候室降低容量测试溢出响应和 `Retry-After`。

## 日志排查字段

按 `module=dynamic-protection` 查询。常见结果包括 `token-issued`、`token-passed`、`token-failed`、`mutation-applied`、`mutation-skipped`、`queue-admitted`、`queue-queued`、`queue-blocked`、`queue-observed`。

## 误伤和风险

- 不要直接对 `/` 全站启用阻断型动态令牌。
- Header 或 query token 需要客户端能保存并回传。
- 等候室首版是节点本地容量，不适合要求全局严格公平的场景。

