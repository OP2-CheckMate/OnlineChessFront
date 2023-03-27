module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'react-native/react-native': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'jsx': true
  },
  'plugins': [
    'react',
    'react-native',
    '@typescript-eslint'
  ],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'rules': {
    // 'react-native/no-unused-styles': 2,
    // 'react-native/no-inline-styles': 2,
    // 'react-native/no-color-literals': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-single-element-style-arrays': 2,
    'indent': [
      'error',
      2
    ],
    'linebreak-style': 0,
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
