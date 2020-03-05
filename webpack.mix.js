const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .babelConfig({
      "presets": [
        "@babel/preset-env"
      ],
      "plugins": [
        "@babel/plugin-proposal-class-properties"
      ],
    });
mix.webpackConfig({
  devServer: {disableHostCheck: true},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js/coreui/'),
      'static': path.resolve(__dirname, 'resources/static/'),
    },
  },
});
if (mix.inProduction()) {
  mix.version();
}
