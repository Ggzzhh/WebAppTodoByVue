const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: "web",
  // 模式： 开发
  mode: 'development',
  // 入口：
  entry: path.join(__dirname, 'client/index.js'),
  // 输出:
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    // 匹配规则，loader配置
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              // 输出的图片名
              name: '[name].[ext]'
            }
          }
        ]
      },

    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev? '"development"': '"production"'
      }
    }),
    // v15版的vue-loader 需要这样才能使用
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader:'postcss-loader',
        options:{
          sourceMap:true
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = "#cheap-module-eval-source-map"
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    // 自动打开浏览器
    // open: true,
    // 热更新？不会加载整个页面
    hot: true
  }

  config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'client/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: ExtractPlugin.extract({
      fallback: 'vue-style-loader',
      use: [
        'css-loader',
        {
          loader:'postcss-loader',
          options:{
            sourceMap:true
          }
        },
        'stylus-loader'
      ]
    })
  })

  config.plugins.push(
    new ExtractPlugin('styles.[chunkhash:8].css')
  )

  config.optimization = {
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
}

module.exports = config

