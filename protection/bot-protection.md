---
pageClass: protection-doc
---

# Bot / 人机验证

Bot / 人机验证用于在敏感路径前增加本地 JS challenge、captcha、行为评分和设备信号校验。Gateway 不在请求热路径调用第三方验证码服务。

## 适用场景

- 后台、登录、支付、抢购等敏感浏览器路径。
- 对异常 User-Agent、缺失 Accept-Language 等轻量信号加挑战。
- 保护需要搜索引擎抓取但不希望普通脚本滥用的页面。

## 后台入口

进入后台“Bot / 人机验证”。选择挑战模式、验证 TTL、失败动作、路径范围和增强选项。

## 如何配置

1. 在“Bot / 人机验证”页面选择防护应用和启用状态。
2. 填写路径，并在“匹配方式”选择“前缀”或“精确”。
3. 选择 challenge 模式：JS challenge 或 captcha。
4. 填写验证 TTL 和失败动作；先用观察，再切换阻断。
5. 按需开启行为评分、设备信号绑定或搜索引擎绕过，并确认这些选项对客户端兼容。

## 匹配范围

Bot 规则路径支持“精确”（底层值 `exact`）和“前缀”（底层值 `prefix`）。方法为空表示全部方法。“前缀”按路径段边界处理，避免 `/admin` 误命中 `/admin2`。

`js-challenge` 发放本地签名 cookie，通过后在 TTL 内放行。`captcha` 使用本地算术验证，通过后写入本地签名 cookie。行为评分使用请求头轻量信号计算，不保存原始指纹。搜索引擎绕过按 User-Agent 判断，当前不做反向 DNS 验证。

## 发布后生效

保存 Bot 规则后必须发布新版本。Gateway 在上传防护之后、动态防护之前执行 Bot 判断。

## 验证方式

1. 发布观察模式或窄路径规则。
2. 用真实浏览器访问，确认 challenge 发放和通过。
3. 用脚本或缺失头部请求访问，确认日志中记录挑战结果。
4. 切换阻断后发布，确认失败请求被阻断。

## 日志排查字段

按 `module=bot-protection` 查询。重点查看 `challenge_mode`、`challenge_result`、`bot_result`、`bot_reason`、`device_signal`、`action`、`disposition`。

## 误伤和风险

- 全站阻断型 challenge 容易影响 API 客户端和搜索引擎。
- 搜索引擎绕过可能被伪造，不要当成强认证。
- 设备信号绑定可能因 UA 或语言变化导致 token 失效。
