# 架构说明

LiteWaf 由控制面、管理界面、数据面网关和状态服务组成。

## 组件边界

| 组件 | 技术 | 职责 |
| --- | --- | --- |
| API | Go 标准库 | 鉴权、配置管理、发布、日志查询、备份恢复和版本信息 |
| Dashboard | Vue 3 + TypeScript + Vite + Naive UI | 后台管理、配置编辑、发布预览和观测页面 |
| Gateway | OpenResty + LuaJIT | 代理、名单、限流、规则检测、拦截和异步日志 |
| PostgreSQL | PostgreSQL | 配置、用户、角色、审计、日志和统计数据 |
| Redis | Redis | 轻量运行状态和计数辅助 |

## 配置流

1. 用户在 Dashboard 保存配置。
2. Dashboard 调用 `/api/v1` 管理接口。
3. API 写入数据库并生成发布预览。
4. 用户确认发布。
5. API 生成版本化网关配置。
6. Gateway 拉取或刷新本地配置并在请求链路执行。
7. Gateway 输出访问日志和 WAF 事件，API 汇总后供后台查询。

## 请求链路

Gateway 热路径不访问远程数据库。黑白名单、静态资源、健康检查和部分无关请求优先短路；请求体检测和上传元数据检测按配置启用。

更完整的边界说明见 [`litewaf-api/doc/架构说明.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/%E6%9E%B6%E6%9E%84%E8%AF%B4%E6%98%8E.md)。
