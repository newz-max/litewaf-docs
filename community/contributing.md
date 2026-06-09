# 贡献指南

LiteWaf 以轻量、开源、快速部署为项目方向。贡献代码、规则或文档时，应保持变更聚焦并补充必要验证。

## 仓库边界

- `litewaf-api`：Go API、部署脚本、默认规则和详细 Markdown 文档。
- `litewaf-dashboard`：Vue 3 管理后台。
- `litewaf-gateway`：OpenResty WAF 网关。
- `docs-site`：独立 VitePress 文档站。

根工作区的 `openspec/` 和内部规划文档用于变更设计和交接，不是普通用户首次部署入口。

## 检查命令

文档站常用检查：

```bash
npm run docs:build
```

API、Dashboard 和 Gateway 变更应在对应仓库内执行各自构建或测试命令。

## 文档维护

新增或修改用户可见功能时，应更新 VitePress 入口页和仍然权威的详细 Markdown 文档。不要把同一操作流程分散到多个互相矛盾的文件中。

完整贡献说明见 [`litewaf-api/doc/贡献指南.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.md)。
