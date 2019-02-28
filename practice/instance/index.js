import Vue from 'vue'

const app = new Vue({
  // el: "#root",
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  watch: {
    text (newText, oldText) {
      console.log(`${newText}: ${oldText}`)
    }
  }
})

// 跟el属性方法是效果是一样的
app.$mount('#root')


setInterval(()=> {
  app.text += 1
}, 1000)
//
// const unWatch = app.$watch('text', (newText, oldText)=>{
//   console.log(`${newText}: ${oldText}`)
// })
// // 通过以上方式使用watch 必须通过手动取消
// setTimeout(()=>{unWatch()}, 2000)

// 监听事件
app.$on('test', (a, b)=> {
  console.log(`test emited ${a} : ${b}`)
})
// 触发事件
app.$emit('test', 1, 2)

// 只监听一次
// app.$once('test', (a, b) => {
//
// })

// 强制渲染一次模板
// app.$forceUpdate()

// 设置/删除
// app.$set(app.obj, 'a', i)
// app.$delete()
