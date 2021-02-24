const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfiguration = require('./webpack.common.js');

module.exports = merge(commonConfiguration, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          'postcss-loader',
        ],
      },
    ],
  },
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
