
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // 可以把 :id 当成属性传入组件中
    // props: true,
    component: () => import('../views/todo/todo.vue'),
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
    component: () => import('../views/login/login.vue'),
    // components: {
    //   default: Login,
    //   a: Todo
    // },
    name: 'login'
  }
]
