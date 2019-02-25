const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: "web",
  // 模式： 开发
  mode: 'development',
  // 入口：
  entry: path.join(__dirname, '../client/index.js'),
  // 输出:
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    // 匹配规则，loader配置
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              // 输出的图片名
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      },

    ]
  }
}


module.exports = config

