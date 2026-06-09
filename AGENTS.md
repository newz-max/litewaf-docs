# LiteWaf Docs Site 协作指南

## 项目定位

本仓库是 LiteWaf 的独立 VitePress 公开文档站。

- 它是独立 Git 仓库，不属于 `codes/litewaf-api`、`codes/litewaf-dashboard` 或 `codes/litewaf-gateway`。
- 本项目负责可浏览的公开文档入口；详细 Markdown 参考仍可链接到 `litewaf-api` 仓库中的 `doc/`。

## 技术栈

```text
VitePress
Vue 3
TypeScript
Markdown
Node.js / npm
```

## 常用命令

```bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
```

提交前至少运行：

```bash
npm run docs:build
```

## Pages 发布

- GitHub Pages 使用 `.github/workflows/deploy-pages.yml`，push `master` 后自动发布。
- GitHub Pages 预期地址：`https://newz-max.github.io/litewaf-docs/`。
- VitePress `base` 必须保持 `/litewaf-docs/`，除非仓库名或发布路径变化。
- Gitee Pages 官方当前标注功能已下线；如账号页面仍可开启 Pages，使用 `gh-pages` 分支中的静态产物发布。

## 文档维护约定

- 用户可见的安装、操作、发布、规则、API、升级和贡献说明优先在本站提供入口。
- `docs-site/` 当前维护中文根路径和英文 `/en/` 路径；用户可见流程变更应同步更新中英文页面，若暂缓某一语言，必须在任务或评审说明中记录例外。
- 站点、规则、策略、IP 名单、访问控制、限流和防护模块变更必须发布后才会被 Gateway 执行，这条边界必须保留在 operator-facing 页面中。
- 页面路径优先使用稳定英文或 kebab-case，页面标题和正文可以使用中文。
- 不写真实服务器地址、密钥、连接串或私密配置。

## 现有文档路径速查

- 文档站首页：`index.md`。
- 英文文档站首页：`en/index.md`。
- VitePress 配置和导航：`.vitepress/config.ts`。
- 快速开始：`guide/quick-start.md`。
- 英文快速开始：`en/guide/quick-start.md`。
- 日常使用和发布生命周期：`guide/usage.md`。
- 英文日常使用：`en/guide/usage.md`。
- Debian 12 部署：`deploy/debian12.md`。
- 英文 Debian 12 部署：`en/deploy/debian12.md`。
- 架构说明：`reference/architecture.md`。
- 英文架构说明：`en/reference/architecture.md`。
- API 概览：`reference/api.md`。
- 英文 API 概览：`en/reference/api.md`。
- 规则编写：`rules/authoring.md`。
- 英文规则编写：`en/rules/authoring.md`。
- 贡献指南：`community/contributing.md`。
- 英文贡献指南：`en/community/contributing.md`。
- 升级和回滚：`release/upgrade.md`。
- 英文升级和回滚：`en/release/upgrade.md`。
- 文档站维护说明：`README.md`。
- 上游详细 Markdown 参考：`litewaf-api/doc/`，其中 `文档索引.md` 是公开文档索引。

## Git 约定

- 本仓库独立提交，commit message 默认使用中文。
- 不要提交 `node_modules/`、`.vitepress/dist/`、`.vitepress/cache/` 或日志文件。
- 如同时修改 LiteWaf API、Dashboard 或 Gateway，请在各自仓库边界内分别处理，不要混到本仓库提交里。

## 质量偏好

- 文档页要能独立帮助读者判断下一步，不要只堆链接。
- 操作步骤必须可执行，命令要能复制运行。
- 如果发现现有文档有明显冲突、重复或过时内容，最终回复中直接指出，由用户决定是否继续清理。
