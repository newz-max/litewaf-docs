# LiteWaf VitePress 文档站

本目录是 LiteWaf 的独立 VitePress 文档站项目，位于工作区根目录，不属于任何 `doc/` 目录，也不属于 `litewaf-api` 仓库。

## 常用命令

```bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
```

脚本都在当前项目根目录运行 VitePress。

## 维护规则

- 用户可见流程变更时，先更新本 VitePress 入口，再同步仍然权威的详细 Markdown。
- 规划和历史材料可以链接，但必须避免被读者误认为当前部署或日常操作指南。
- 站点、规则、策略、IP 名单、访问控制、限流和防护模块变更必须发布后才会被 Gateway 执行，这条边界应保留在 operator-facing 页面中。
- 不提交 `.vitepress/dist/`、`.vitepress/cache/` 或 `node_modules/`。
