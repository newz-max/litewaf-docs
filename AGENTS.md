# LiteWaf Docs Site 协作指南

## 项目定位

本仓库是 LiteWaf 的独立 VitePress 公开文档站，位于 `D:\Project\web_safe\docs-site`。

- 它是独立 Git 仓库，不属于 `codes/litewaf-api`、`codes/litewaf-dashboard` 或 `codes/litewaf-gateway`。
- 不要把本项目移动到 `doc/` 或 `codes/litewaf-api/`。
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

## 文档维护约定

- 用户可见的安装、操作、发布、规则、API、升级和贡献说明优先在本站提供入口。
- 避免复制大量历史规划内容；需要引用时链接到源文档，并明确它是参考或历史材料。
- 站点、规则、策略、IP 名单、访问控制、限流和防护模块变更必须发布后才会被 Gateway 执行，这条边界必须保留在 operator-facing 页面中。
- 页面路径优先使用稳定英文或 kebab-case，页面标题和正文可以使用中文。
- 不写真实服务器地址、密钥、连接串或本机私有部署路径。

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

- 本仓库独立提交，commit message 默认使用中文。
- 不要提交 `node_modules/`、`.vitepress/dist/`、`.vitepress/cache/` 或日志文件。
- 如同时修改 LiteWaf API、Dashboard、Gateway 或根目录 OpenSpec，请在各自仓库或工作区边界内分别处理，不要混到本仓库提交里。

## 质量偏好

- 文档页要能独立帮助读者判断下一步，不要只堆链接。
- 操作步骤必须可执行，命令要能复制运行。
- 如果发现现有文档有明显冲突、重复或过时内容，最终回复中直接指出，由用户决定是否继续清理。
