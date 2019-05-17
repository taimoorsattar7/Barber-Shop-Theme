const path = require('path'),
settings = require('./settings'),
UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dirNode = 'node_modules';

module.exports = {

  entry: {
    App: settings.themeLocation + "js/scripts.js"
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  output: {
    path: path.resolve(__dirname, settings.themeLocation + "js"),
    filename: "scripts-bundled.js"
  },
  //optimization: {
  //  minimizer: [
  //  new UglifyJsPlugin()
  //  ]
  //},
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
    ]
  },
  mode: 'production'
}