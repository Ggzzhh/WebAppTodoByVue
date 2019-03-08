const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 合并不同的webpack配置
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

console.log(process.env.NODE_ENV);

const devServer = {
  port: 3333,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  // 自动打开浏览器
  // open: true,
  // 热更新？不会加载整个页面
  hot: true
}

const defaultPulgins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  // v15版的vue-loader 需要这样才能使用
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: "#cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          {
            loader:'css-loader',
            options: {
              // 启用css modules 可以转换css名
              // modules: true,
              // localIdentName: isDev? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
            }
          },
          {
            loader:'postcss-loader',
            options:{
              sourceMap:true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // 修改import Vue from 'vue' 的默认导入对象
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPulgins.concat([
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
  ]),
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2, maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
})


module.exports = config

