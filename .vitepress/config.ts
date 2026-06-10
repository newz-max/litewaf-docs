import { defineConfig } from 'vitepress'

const zhNav = [
  { text: '快速开始', link: '/guide/quick-start' },
  { text: '使用', link: '/guide/usage' },
  { text: '防护模块', link: '/protection/' },
  { text: '部署', link: '/deploy/debian12' },
  { text: '参考', link: '/reference/architecture' },
  { text: '规则', link: '/rules/authoring' },
  { text: '贡献', link: '/community/contributing' }
]

const enNav = [
  { text: 'Quick Start', link: '/en/guide/quick-start' },
  { text: 'Usage', link: '/en/guide/usage' },
  { text: 'Protection', link: '/en/protection/' },
  { text: 'Deploy', link: '/en/deploy/debian12' },
  { text: 'Reference', link: '/en/reference/architecture' },
  { text: 'Rules', link: '/en/rules/authoring' },
  { text: 'Contribute', link: '/en/community/contributing' }
]

const zhSidebar = [
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
    text: '防护模块',
    items: [
      { text: '模块总览', link: '/protection/' },
      { text: 'CC 防护', link: '/protection/cc-protection' },
      { text: '攻击防护', link: '/protection/attack-protection' },
      { text: 'IP 黑白名单', link: '/protection/ip-access-list' },
      { text: '访问控制', link: '/protection/access-control' },
      { text: '上传防护', link: '/protection/upload-protection' },
      { text: 'Bot / 人机验证', link: '/protection/bot-protection' },
      { text: '动态防护 / 等候室', link: '/protection/dynamic-protection' },
      { text: '高级规则生态', link: '/protection/advanced-rules' }
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
]

const enSidebar = [
  {
    text: 'Start',
    items: [
      { text: 'Docs Home', link: '/en/' },
      { text: 'Quick Start', link: '/en/guide/quick-start' },
      { text: 'Daily Usage', link: '/en/guide/usage' }
    ]
  },
  {
    text: 'Deploy and Operate',
    items: [
      { text: 'Debian 12 Deployment', link: '/en/deploy/debian12' },
      { text: 'Upgrade and Rollback', link: '/en/release/upgrade' }
    ]
  },
  {
    text: 'Protection Modules',
    items: [
      { text: 'Overview', link: '/en/protection/' },
      { text: 'CC Protection', link: '/en/protection/cc-protection' },
      { text: 'Attack Protection', link: '/en/protection/attack-protection' },
      { text: 'IP Access Lists', link: '/en/protection/ip-access-list' },
      { text: 'Access Control', link: '/en/protection/access-control' },
      { text: 'Upload Protection', link: '/en/protection/upload-protection' },
      { text: 'Bot Verification', link: '/en/protection/bot-protection' },
      { text: 'Dynamic Protection', link: '/en/protection/dynamic-protection' },
      { text: 'Advanced Rules', link: '/en/protection/advanced-rules' }
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'Architecture', link: '/en/reference/architecture' },
      { text: 'API Overview', link: '/en/reference/api' }
    ]
  },
  {
    text: 'Rules and Community',
    items: [
      { text: 'Rule Authoring', link: '/en/rules/authoring' },
      { text: 'Contribution Guide', link: '/en/community/contributing' }
    ]
  }
]

export default defineConfig({
  base: '/litewaf-docs/',
  cleanUrls: true,
  lastUpdated: true,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'LiteWaf',
      description: '开源、轻便、快速部署的 OpenResty WAF 文档中心',
      themeConfig: {
        nav: zhNav,
        sidebar: zhSidebar,
        lastUpdated: {
          text: '最后更新'
        },
        returnToTopLabel: '返回顶部',
        outline: {
          label: '页面导航'
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        footer: {
          message: 'Released under the Apache-2.0 License.',
          copyright: 'Copyright LiteWaf contributors'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'LiteWaf',
      description: 'Open, lightweight, fast-to-deploy OpenResty WAF documentation',
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
        lastUpdated: {
          text: 'Last updated'
        },
        footer: {
          message: 'Released under the Apache-2.0 License.',
          copyright: 'Copyright LiteWaf contributors'
        }
      }
    }
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '没有结果',
                resetButtonTitle: '清除查询',
                backButtonTitle: '关闭搜索',
                displayDetails: '显示详细列表',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/newz-max/litewaf-api' }
    ]
  }
})
