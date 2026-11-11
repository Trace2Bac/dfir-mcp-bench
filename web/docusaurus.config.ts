import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import benchDataPlugin from './plugins/bench-data';

// The site shows experiments/ as before/after comparisons. The pages under
// /experiments/<id> come from plugins/bench-data.ts; the method and how-to pages
// come from ../docs.
const config: Config = {
  title: 'DFIR MCP Bench',
  tagline: 'Before/after evidence for DFIR MCP server changes',
  favicon: 'img/favicon.svg',
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
        docs: {
          path: '../docs',
          routeBasePath: 'docs',
          sidebarPath: undefined,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  plugins: [benchDataPlugin],

  themeConfig: {
    colorMode: {respectPrefersColorScheme: true},
    navbar: {
      title: 'DFIR MCP Bench',
      items: [
        {to: '/', label: 'Results', position: 'left', activeBaseRegex: '^/(experiments/.*)?$'},
        {to: '/docs/findings', label: 'Findings', position: 'left'},
        {to: '/docs/notes', label: 'Notes', position: 'left'},
        {to: '/docs/method', label: 'Test method', position: 'left'},
        {to: '/docs/running', label: 'Guide', position: 'left'},
        {to: '/docs/adding-a-case', label: 'Adding', position: 'left'},
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
