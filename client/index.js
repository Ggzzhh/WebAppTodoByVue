import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import './assets/styles/footer.styl'
import createRouter from './config/router'

Vue.use(VueRouter)

const router = createRouter()

// 注册路由守卫(装饰器) 每次跳转时触发钩子
router.beforeEach((to, from, next) => {
  // 不执行next() 不会跳转
  console.log('跳转前执行')
  // if (to.fullPath === '/login') {
  //   next()
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('跳转时执行')
  next()
})

router.afterEach((to, from) => {
  console.log('跳转后执行')
})

new Vue({
  router,
  render: (h) => h(app)
}).$mount('#root')
