module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          ie: '11',
          safari: '11.1',
          chrome: '64',
          edge: '17',
          firefox: '50'
        },
        useBuiltIns: 'entry',
        corejs: '3.29'
      }
    ]
  ]
}
