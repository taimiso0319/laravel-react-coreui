const path          = require('path')
const mix           = require('laravel-mix')
const webpack       = require('webpack')
const { version }   = require('./package.json')
const WebpackBar    = require('webpackbar')
const OfflinePlugin = require('offline-plugin')


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
mix.sass('resources/sass/app.scss', 'public/css')

mix.webpackConfig({
  devServer: { disableHostCheck: true },
  resolve  : {
    alias: {
      '@'         : path.resolve(__dirname, 'resources/js/coreui/'),
      'static'    : path.resolve(__dirname, 'resources/static/'),
    },
  },
  plugins: [
    new WebpackBar({ profile: true }),
    new webpack.DefinePlugin({ __VERSION: JSON.stringify(version) }),
    new OfflinePlugin({
      publicPath      : '/',
      appShell        : '/',
      responseStrategy: 'network-first',
      externals       : [
        '/',
        '/manifest.json',
        '/favicon.png',
      ],
      ServiceWorker: {
        entry : path.resolve(__dirname, 'resources/js/sw.js'),
        output: 'sw.js',
        minify: mix.inProduction(),
      },
    }),
  ],
})

mix.extract([
  'axios',
  'bootstrap',
  'jquery',
  'lodash',
])

mix.options({
  clearConsole: false,
  terser: { terserOptions: { parallel: true } },
})

if (mix.inProduction())
  mix.version()
else
  mix.sourceMaps()

if (process.platform === 'darwin')
  mix.disableNotifications()
