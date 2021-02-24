const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfiguration = require('./webpack.common.js');

module.exports = merge(commonConfiguration, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
  ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       exclude: /node_modules/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         { loader: 'css-loader', options: { sourceMap: false } },
  //         'postcss-loader',
  //       ],
  //     },
  //   ],
  // },
});
