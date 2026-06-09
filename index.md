---
layout: home

hero:
  name: LiteWaf
  text: OpenResty WAF 文档中心
  tagline: 面向部署、日常操作、规则编写和集成开发的公开文档入口。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quick-start
    - theme: alt
      text: 日常使用
      link: /guide/usage

features:
  - title: 快速部署
    details: 按 Docker Compose 生产栈完成安装、健康检查、后台登录和网关验证。
  - title: 发布生效
    details: 站点、规则、策略、IP 名单和防护模块变更都需要发布后才会进入网关执行。
  - title: 轻量架构
    details: 控制面使用 Go 标准库，数据面使用 OpenResty + LuaJIT，后台使用 Vue 3。
---

## 文档地图

| 场景 | 入口 |
| --- | --- |
| 第一次安装和验证 | [快速开始](./guide/quick-start.md) |
| 日常创建站点、配置防护和发布 | [日常使用](./guide/usage.md) |
| 生产部署、升级和回滚 | [Debian 12 部署](./deploy/debian12.md)、[升级和回滚](./release/upgrade.md) |
| 理解系统边界 | [架构说明](./reference/architecture.md) |
| 对接管理接口 | [API 概览](./reference/api.md) |
| 编写和贡献规则 | [规则编写](./rules/authoring.md)、[贡献指南](./community/contributing.md) |

## 详细参考来源

当前 VitePress 站点是公开文档的可浏览入口。更完整的 Markdown 参考仍维护在 API 仓库的 [`doc/`](https://github.com/newz-max/litewaf-api/tree/master/doc) 目录中；其中的历史规划内容只用于理解演进，不作为首次部署或日常操作的优先入口。
