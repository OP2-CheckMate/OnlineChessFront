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
    // 'react-native/no-raw-text': 2, All strings should be wrapped in a Text component
    // 'react-native/no-unused-styles': 2, 
    // 'react-native/no-inline-styles': 2, All styles should come from stylesheet
    // 'react-native/no-color-literals': 2, All colors should be placed in variables instead of hardcoded to styles
    'react-native/split-platform-components': 2, // All the components should support ios and android
    'react-native/no-single-element-style-arrays': 2, // e.g. <View style={[{height: 10}]} /> throws error
    'indent': [
      'error',
      2
    ],
    'eqeqeq': 'warn',
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
