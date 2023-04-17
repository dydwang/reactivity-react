const DOMGlobals = ['window', 'document'];
const NodeGlobals = ['module', 'require'];

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    // most of the codebase are expected to be env agnostic
    // 'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    // since we target ES2015 for baseline support, we need to forbid object
    // rest spread usage (both assign and destructure)
    'no-restricted-syntax': 'off',
    'no-restricted-globals': 'off',
    'semi': ['error', 'always'], // 结尾分号
    'no-var': 0, // 禁用var，用let和const代替
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'react/prop-types': 0, // 防止在react组件定义中缺少props验证
    'no-new': 0,
    'quotes': 0,
    'prefer-const': 0, // 不要强行将let 转化成const
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'camelcase': 'off',
    '@typescript-eslist/camelcase': 0 // 强制驼峰法命名 - 关闭
  },
  overrides: [
    // tests, no restrictions (runs in Node / jest with jsdom)
    {
      files: ['**/__tests__/**', 'test-dts/**'],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off'
      }
    },
    // shared, may be used in any env
    {
      files: ['packages/shared/**'],
      rules: {
        'no-restricted-globals': 'off'
      }
    },
    // Packages targeting DOM
    {
      files: ['packages/{vue,vue-compat,runtime-dom}/**'],
      rules: {
        'no-restricted-globals': ['error', ...NodeGlobals]
      }
    },
    // Packages targeting Node
    {
      files: [
        'packages/{compiler-sfc,compiler-ssr,server-renderer,reactivity-transform}/**'
      ],
      rules: {
        'no-restricted-globals': ['error', ...DOMGlobals],
        'no-restricted-syntax': 'off'
      }
    },
    // Private package, browser only + no syntax restrictions
    {
      files: ['packages/template-explorer/**', 'packages/sfc-playground/**'],
      rules: {
        'no-restricted-globals': ['error', ...NodeGlobals],
        'no-restricted-syntax': 'off'
      }
    }
  ]
};
