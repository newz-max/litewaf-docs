# LiteWaf VitePress 文档站

本目录是 LiteWaf 的独立 VitePress 文档站项目。

## 常用命令

```bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
```

脚本都在当前文档站项目内运行 VitePress。

## Pages 发布

- GitHub Pages 通过 `.github/workflows/deploy-pages.yml` 自动构建并发布 `master` 分支。
- GitHub Pages 地址为 `https://newz-max.github.io/litewaf-docs/`。
- VitePress `base` 固定为 `/litewaf-docs/`，适配 GitHub Pages 和同名仓库路径发布。
- Gitee Pages 官方当前标注功能已下线；本仓库可推送 `.vitepress/dist` 到 `gh-pages` 分支，若账号页面仍提供 Pages 入口，可选择该分支发布。

## 维护规则

- 用户可见流程变更时，先更新本 VitePress 入口，再同步仍然权威的详细 Markdown。
- 站点、规则、策略、IP 名单、访问控制、限流和防护模块变更必须发布后才会被 Gateway 执行，这条边界应保留在 operator-facing 页面中。
- 不提交 `.vitepress/dist/`、`.vitepress/cache/` 或 `node_modules/`。
