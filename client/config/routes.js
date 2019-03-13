// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // 可以把 :id 当成属性传入组件中
    // props: true,
    component: () => import(/* webpackChunkName: "todo-view" */'../views/todo/todo.vue'),
    // component: Todo,
    // 同时加载多个组件
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    // 可以根据name进行路由设定
    name: 'app',
    // 设置元数据 head中的meta等
    meta: {
      title: '自己的app',
      description: '描述',
      author: '呵呵呵哒'
    },
    // 子路由
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
    beforeEnter (to, from , next){
      console.log('app route before enter')
      next( )
    }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login-view" */'../views/login/login.vue'),
    // component: Login,
    // components: {
    //   default: Login,
    //   a: Todo
    // },
    name: 'login'
  }
]
