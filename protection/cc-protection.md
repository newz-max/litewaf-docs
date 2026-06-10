---
pageClass: protection-doc
---

# CC 防护

CC 防护用于限制高频访问、登录爆破、API 调用滥用、404 扫描和攻击命中频率。当前规则以 `module=cc-protection`、`category=rate-limit` 的频率限制模型执行。

## 适用场景

- 登录、短信、验证码、搜索等高成本接口防爆破。
- API 调用频率限制。
- 全站基础访问频率保护。
- 404 扫描和同源攻击命中频率限制。

## 后台入口

进入后台“CC 防护”。只读角色只能查看；管理员可以新增、编辑、删除和启停规则。

## 如何配置

1. 在“防护应用”中选择要生效的应用；需要全局规则时保持全局范围。
2. 在“路径”填写要保护的 URI 路径，例如 `/api/login`、`/api/` 或 `/api/*`。
3. 在“匹配方式”选择 Dashboard 里的“前缀”“精确”或“Glob”。“Glob”只在 CC 防护页面出现。
4. 在“方法”选择需要统计的 HTTP 方法；留空表示全部方法。
5. 在“统计对象”选择 `client_ip`、`client_ip_path`、`global`、`session`、`device`、`not_found_frequency` 或 `attack_frequency`。
6. 填写窗口、阈值、动作和封禁时间。先用观察或较宽松阈值验证，再切换阻断或封禁。

## 匹配范围

### 精确

底层值：`exact`。请求 URI 必须与配置路径完全相同。`/api/login` 只匹配 `/api/login`，不匹配 `/api/login/`；Gateway 使用路径部分判断，不使用查询字符串参与路径匹配。

### 前缀

底层值：`prefix`。按路径段边界匹配。`/admin` 匹配 `/admin` 和 `/admin/users`，不匹配 `/admin2`。配置 `/api/` 时会覆盖 `/api`、`/api/` 和 `/api/users`，适合多级 API 前缀。

### Glob

底层值：`glob`。仅 CC 防护支持，用于受限路径通配。`*` 匹配单个路径段内任意字符，不跨 `/`；`?` 匹配单个非 `/` 字符；不支持正则、字符集或 `**`。例如 `/api/*` 匹配 `/api/login`，不匹配 `/api/v1/login`。需要覆盖多级路径时，在 Dashboard 选择“前缀”并填写 `/api/`。

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
- “Glob”适合单层路径，跨层 API 使用“前缀”更清晰。
- 需要区分客户端 IP 时，先确认可信代理和真实 IP 配置正确。
