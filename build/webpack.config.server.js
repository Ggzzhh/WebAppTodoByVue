const path = require('path')
const webpack = require('webpack')
// 合并不同的webpack配置
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
// const VueServerPlugin = require('vue-server-renderer/server-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


let config

config = merge(baseConfig, {
  mode: 'development',
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build'),
    publicPath: 'http://127.0.0.1:3333/public/'
  },
  externals: Object.keys(require('../package.json').dependencies),
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90
          'vue-style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[chunkhash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    // new VueServerPlugin(),
    new VueLoaderPlugin()
  ]
})

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/server-model.js')
  }
}


module.exports = config

