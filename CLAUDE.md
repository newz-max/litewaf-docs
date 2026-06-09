# LiteWaf Docs Site 协作指南

本文件供 Claude 在 `D:\Project\web_safe\docs-site` 独立文档站仓库中协作时读取。规则与 `AGENTS.md` 保持一致。

## 全局偏好

- Git commit message 默认使用中文。
- 当用户询问 VitePress、Vue、npm 或其他库/CLI/API 用法时，使用 Context7 MCP 获取当前文档。
- 不要把本仓库的文档站文件放入 `doc/` 或 `codes/litewaf-api/`。

## 项目定位

本仓库是 LiteWaf 的独立 VitePress 公开文档站。

- 仓库路径：`D:\Project\web_safe\docs-site`
- 文档站源码：当前仓库根目录
- VitePress 配置：`.vitepress/config.ts`
- 构建输出：`.vitepress/dist/`

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

## 维护约定

- 本站是可浏览公开文档入口，详细参考可链接到 `litewaf-api/doc/`。
- 用户可见流程变更时，优先更新本站入口页，再同步权威详细 Markdown。
- 规划和历史材料可以链接，但必须避免被读者误认为当前部署或日常操作指南。
- 站点、规则、策略、IP 名单、访问控制、限流和防护模块配置变更必须发布后才会被 Gateway 执行。
- 页面路径优先使用稳定英文或 kebab-case，中文用于标题和正文。

## 现有文档路径速查

- 文档站首页：`index.md`。
- VitePress 配置和导航：`.vitepress/config.ts`。
- 快速开始：`guide/quick-start.md`。
- 日常使用和发布生命周期：`guide/usage.md`。
- Debian 12 部署：`deploy/debian12.md`。
- 架构说明：`reference/architecture.md`。
- API 概览：`reference/api.md`。
- 规则编写：`rules/authoring.md`。
- 贡献指南：`community/contributing.md`。
- 升级和回滚：`release/upgrade.md`。
- 文档站维护说明：`README.md`。
- 上游详细 Markdown 参考：`../codes/litewaf-api/doc/`，其中 `文档索引.md` 是公开文档索引。
- 工作区内部规划和 OpenSpec：`../doc/`、`../openspec/`，不要直接当作用户首次部署或日常操作说明。

## Git 约定

- 本仓库独立提交，不要把变更混入 `litewaf-api`。
- 不提交 `node_modules/`、`.vitepress/dist/`、`.vitepress/cache/`、日志文件或私密配置。
- 如用户要求提交，使用中文提交信息。

## 质量偏好

- 文档内容应面向真实使用路径，优先说明入口、前置条件、命令、验证方式和失败排查方向。
- 避免互相矛盾的重复说明；发现明显冲突或过时内容时，在最终回复中指出。
