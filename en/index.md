---
layout: home

hero:
  name: LiteWaf
  text: OpenResty WAF Documentation
  tagline: Public documentation for deployment, daily operations, rule authoring, and management API integration.
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guide/quick-start
    - theme: alt
      text: Daily Usage
      link: /en/guide/usage

features:
  - title: Fast Deployment
    details: Start the Docker Compose production stack, check service health, log in to the dashboard, and validate the gateway.
  - title: Publish to Enforce
    details: Site, rule, policy, IP list, access control, and protection module changes take effect at the gateway only after publishing.
  - title: Lightweight Architecture
    details: The control plane uses Go, the data plane uses OpenResty + LuaJIT, and the dashboard uses Vue 3.
---

## Documentation Map

| Scenario | Entry |
| --- | --- |
| First installation and validation | [Quick Start](./guide/quick-start.md) |
| Daily site, protection, and publishing work | [Daily Usage](./guide/usage.md) |
| Production deployment, upgrade, and rollback | [Debian 12 Deployment](./deploy/debian12.md), [Upgrade and Rollback](./release/upgrade.md) |
| Understand system boundaries | [Architecture](./reference/architecture.md) |
| Integrate with the management API | [API Overview](./reference/api.md) |
| Author and contribute rules | [Rule Authoring](./rules/authoring.md), [Contribution Guide](./community/contributing.md) |

## Detailed References

This VitePress site is the browsable public documentation entry point. More detailed Markdown references are still maintained in the API repository [`doc/`](https://github.com/newz-max/litewaf-api/tree/master/doc) directory. Historical planning material is useful for understanding project evolution, but it is not the preferred first-run or daily operations entry point.
