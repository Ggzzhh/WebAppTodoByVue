const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 合并不同的webpack配置
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

// console.log(process.env.NODE_ENV);

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  // 自动打开浏览器
  // open: true,
  // 热更新？不会加载整个页面
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  // hotOnly:true,
  // 开启vue-router history模式后需要后端支持才能使用
  historyApiFallback: {
    index: '/public/index.html'
  }
}

const defaultPulgins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev? '"development"': '"production"'
    }
  }),
  // v15版的vue-loader 需要这样才能使用
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

let config

if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
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
    plugins: defaultPulgins.concat([
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              {
                loader:'css-loader',
                options: {
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
          })
        }
      ]
    },
    plugins: defaultPulgins.concat([
      new ExtractPlugin('styles.[chunkhash:8].css')
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
}

module.exports = config

