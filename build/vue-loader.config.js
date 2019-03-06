module.exports = (isDev) => {
  return {
    // 去除渲染过程中不必要的空格
    preserveWhitespace: true,
    // 把.vue文件中的css单独打包
    extractCSS: !isDev,
    // 根据环境变量生成的热重载
    // hotReload: false,
    // 自定义loader 模块
    loaders: {

    },
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
  }
};
