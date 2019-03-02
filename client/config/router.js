import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    // 开启后屏蔽hash模式 更换为history
    mode: 'history',
    // base: '/base/',

    // 视图中router-link的类名 exact会完全匹配
    // linkActiveClass: 'active-link',
    // linkExactActiveClass: 'exact-active-link'

    // 路径跳转后的滚动行为
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    },
    // 解析?后跟着的内容
    // parseQuery (query) {},
    // 反解析?后跟着的内容
    // stringifyQuery(obj) {},
    // 自动在不支持history模式时使用hash模式
    fallback: true
  })
}
