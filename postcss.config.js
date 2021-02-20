const tailwindCSS = require('tailwindcss');
const postCSSPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [tailwindCSS, postCSSPresetEnv, autoprefixer],
};
