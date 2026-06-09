# Contribution Guide

LiteWaf is oriented around being lightweight, open source, and fast to deploy. Code, rule, and documentation contributions should stay focused and include the necessary validation.

## Repository Boundaries

- `litewaf-api`: Go API, deployment scripts, default rules, and detailed Markdown documentation.
- `litewaf-dashboard`: Vue 3 administration dashboard.
- `litewaf-gateway`: OpenResty WAF gateway.
- `docs-site`: independent VitePress documentation site.

## Checks

Docs-site check:

```bash
npm run docs:build
```

API, Dashboard, and Gateway changes should run the relevant build or test commands inside their own repositories.

## Documentation Maintenance

When adding or changing user-visible functionality, update the VitePress entry pages and any detailed Markdown references that remain authoritative. Do not split the same operational workflow across conflicting documents.

For public docs-site workflow changes, update both Chinese and English pages. If one language must be deferred, record the exception in the task or review notes so parity can be restored deliberately.

Full contribution details are available in [`litewaf-api/doc/贡献指南.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.md).
