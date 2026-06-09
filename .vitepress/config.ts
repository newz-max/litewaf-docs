import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'LiteWaf',
  description: '开源、轻便、快速部署的 OpenResty WAF 文档中心',
  base: '/litewaf-docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/guide/quick-start' },
      { text: '使用', link: '/guide/usage' },
      { text: '部署', link: '/deploy/debian12' },
      { text: '参考', link: '/reference/architecture' },
      { text: '规则', link: '/rules/authoring' },
      { text: '贡献', link: '/community/contributing' }
    ],
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '文档首页', link: '/' },
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '日常使用', link: '/guide/usage' }
        ]
      },
      {
        text: '部署和运维',
        items: [
          { text: 'Debian 12 部署', link: '/deploy/debian12' },
          { text: '升级和回滚', link: '/release/upgrade' }
        ]
      },
      {
        text: '系统参考',
        items: [
          { text: '架构说明', link: '/reference/architecture' },
          { text: 'API 概览', link: '/reference/api' }
        ]
      },
      {
        text: '规则和生态',
        items: [
          { text: '规则编写', link: '/rules/authoring' },
          { text: '贡献指南', link: '/community/contributing' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/newz-max/litewaf-api' }
    ],
    footer: {
      message: 'Released under the Apache-2.0 License.',
      copyright: 'Copyright LiteWaf contributors'
    }
  }
})
