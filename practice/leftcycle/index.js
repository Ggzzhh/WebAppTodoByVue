// vue 的生命周期

import Vue from 'vue'

const app = new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'aaa'
  },
  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  created () {
    console.log(this, 'created')
  },
  beforeMount () {
    console.log(this, 'beforeMount')
  },
  mounted () {
    console.log(this, 'mounted')
  },
  beforeUpdate () {
    // 数据更新前执行
    console.log(this, 'beforeUpdate')
  },
  updated () {
    // 数据更新时执行
    console.log(this, 'updated')
  },
  activated () {
    // keep alive 相关
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    // 销毁前执行
    console.log(this, 'beforeDestroy')
  },
  destroy () {
    // 销毁时执行
    console.log(this, 'destroy')
  },
  renderError (createElement, err) {
    // 开发环境 捕获自身的错误
    return createElement('div', {}, err.stack)
  },
  errorCaptured (err, vm, info) {
    // 正式版本可用 向上冒泡 类似renderError
  }
})


