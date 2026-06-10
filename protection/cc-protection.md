# CC 防护

CC 防护用于限制高频访问、登录爆破、API 调用滥用、404 扫描和攻击命中频率。当前规则以 `module=cc-protection`、`category=rate-limit` 的频率限制模型执行。

## 适用场景

- 登录、短信、验证码、搜索等高成本接口防爆破。
- API 调用频率限制。
- 全站基础访问频率保护。
- 404 扫描和同源攻击命中频率限制。

## 后台入口

进入后台“CC 防护”。只读角色只能查看；管理员可以新增、编辑、删除和启停规则。

## 推荐配置

| 场景 | 路径 | 匹配 | 方法 | 统计对象 | 阈值和动作 |
| --- | --- | --- | --- | --- | --- |
| 登录防爆破 | `/api/login` | `exact` | `POST` | `client_ip` | 10 次 / 60 秒，`ban` 600 秒 |
| API 限流 | `/api/` | `prefix` | 全部 | `client_ip_path` | 120 次 / 60 秒，`rate-limit` |
| 全站基础保护 | `/` | `prefix` | 全部 | `client_ip` | 300 次 / 60 秒，`rate-limit` |
| 404 扫描 | `/api/*` | `glob` | 全部 | `not_found_frequency` | 20 次 / 60 秒，`rate-limit` |
| 会话级登录限制 | `/api/login` | `exact` | `POST` | `session` | 8 次 / 60 秒，`block` |

## 匹配范围

`exact` 要求请求 URI 与配置路径完全相同。`/api/login` 只匹配 `/api/login`，不匹配 `/api/login/` 或 `/api/login?x=1` 中的查询部分；Gateway 使用路径部分判断。

`prefix` 按路径段边界匹配。`/admin` 匹配 `/admin` 和 `/admin/users`，不匹配 `/admin2`。配置 `/api/` 时会覆盖 `/api`、`/api/` 和 `/api/users`，适合多级 API 前缀。

`glob` 仅 CC 防护支持，用于受限路径通配。`*` 匹配单个路径段内任意字符，不跨 `/`；`?` 匹配单个非 `/` 字符；不支持正则、字符集或 `**`。例如 `/api/*` 匹配 `/api/login`，不匹配 `/api/v1/login`。需要覆盖多级路径时使用 `prefix=/api/`。

方法为空表示全部 HTTP 方法。统计对象可选 `client_ip`、`client_ip_path`、`global`、`not_found_frequency`、`attack_frequency`、`session`、`device`。`session` 需要配置 Cookie 或 Header 名称，`device` 使用粗粒度请求信号派生计数键，不记录原始指纹。

## 发布后生效

保存或模拟预览不会更新 Gateway 计数和活动规则。发布新版本后，Gateway 才会加载 CC 规则。发布预览会提示全站低阈值、宽泛 `glob`、阻断类动作等高风险配置。

## 验证方式

1. 发布后对目标路径连续发起超过阈值的请求。
2. 确认响应为 `429` 或规则定义的阻断结果。
3. 修改阈值或回滚发布后，再次验证行为恢复。

## 日志排查字段

攻击日志按 `module=cc-protection` 查询。重点查看 `rule_name`、`counter`、`threshold`、`window_sec`、`action`、`disposition` 和请求路径。

## 误伤和风险

- 不要一开始对 `/` 设置过低阈值并直接阻断。
- 登录封禁规则会影响同 IP 下的合法用户，建议先观察。
- `glob` 适合单层路径，跨层 API 使用 `prefix` 更清晰。
- 需要区分客户端 IP 时，先确认可信代理和真实 IP 配置正确。

