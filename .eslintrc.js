module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  // 安装 eslint-plugin-prettier
  // 这关闭了一些与prettier冲突的ESLint规则。
  // extends: ['prettier'],
  // plugins: ['prettier'],

  plugins: ['standard'], // eslint 设置的rules标准库

  // 开启边写边检查
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  // 0 off    1 warn    2 error
  rules: {
    eqeqeq: 2,
    quotes: [2, 'single', { allowTemplateLiterals: true }]
  }
}
