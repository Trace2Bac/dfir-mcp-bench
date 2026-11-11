import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import benchDataPlugin from './plugins/bench-data';

// The site shows experiments/ as before/after comparisons. The pages under
// /experiments/<id> come from plugins/bench-data.ts; the method and how-to pages
// come from ../docs.
// Docusaurus builds one locale at a time and names it here.
const KO = process.env.DOCUSAURUS_CURRENT_LOCALE === 'ko';

const config: Config = {
  title: 'DFIR MCP Bench',
  tagline: 'Before/after evidence for DFIR MCP server changes',
  favicon: 'img/custom_logo.png',
  future: {v4: true},

  url: 'https://trace2bac.github.io',
  // `npm start` serves at /, build and serve use the GitHub Pages path. BASE_URL overrides both.
  baseUrl: process.env.BASE_URL ?? (process.argv.includes('start') ? '/' : '/dfir-mcp-bench/'),
  organizationName: 'Trace2Bac',
  projectName: 'dfir-mcp-bench',

  onBrokenLinks: 'throw',
  // Run pages link each run to its files in the repository.
  customFields: {repoTree: 'https://github.com/Trace2Bac/dfir-mcp-bench/tree/main'},
  // English is the default; Korean is served under /ko/. Experiment and case
  // text uses `<field>_ko` from the YAML files on the Korean site (see plugins/bench-data.ts).
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    localeConfigs: {en: {label: 'English'}, ko: {label: '한국어'}},
  },

  presets: [
    [
      'classic',
      {
        // Dated write-ups across experiments (docs/), next to the experiment pages.
        docs: {
          // docs/ko/ holds the Korean version of each document under the same
          // name, and the Korean site is built from it.
          path: KO ? '../docs/ko' : '../docs',
          routeBasePath: 'docs',
          exclude: ['ko/**', '**/_*.{js,jsx,ts,tsx,md,mdx}', '**/_*/**', '**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**'],
          sidebarPath: undefined,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  plugins: [benchDataPlugin],

  // Local search, built into the site at build time (no external service).
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'ko'],
        docsRouteBasePath: 'docs',
        indexBlog: false,
        indexPages: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: {respectPrefersColorScheme: true},
    image: 'img/custom_logo.png',
    navbar: {
      title: 'DFIR MCP Bench',
      logo: {alt: 'Trace2Bac logo', src: 'img/custom_logo.png'},
      items: [
        {to: '/', label: 'Results', position: 'left', activeBaseRegex: '^/(experiments/.*)?$'},
        // Opens the first document of the sidebar; every document is listed there.
        {type: 'docSidebar', sidebarId: 'defaultSidebar', label: 'Docs', position: 'left'},
        {type: 'localeDropdown', position: 'right'},
        {href: 'https://github.com/Trace2Bac/dfir-mcp-bench', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      copyright: 'Copyright © 2026 Trace2Bac. Built with Docusaurus.',
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
};

export default config;
