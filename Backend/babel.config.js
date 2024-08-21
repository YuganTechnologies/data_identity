module.exports = {
  presets: [
    ['@babel/preset-flow'],
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage', // Automatically import polyfills based on usage
        targets: {
          node: 'current', // Target the current Node.js version
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3, // Specify the core-js version
      },
    ],
  ],
  ignore: ['dist'],
};
