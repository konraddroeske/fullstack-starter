const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');

module.exports = merge(commonConfiguration, {
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:8050',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
