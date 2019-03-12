import createApp  from './create-app'


export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()

    // console.log(context)
    if (context.user) {
      store.state.user = context.user
    }

    router.push(context.url)

    router.onReady(() => {
      // 根据url做一些操作
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no components matched! '))
      }

      Promise.all(matchedComponents.map((Component) => {
        // console.log(Component)
        if(Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            router,
            store
          })
        }
      })).then(data => {
        // console.log(store.state)
        context.meta = app.$meta()
        context.state = store.state
        context.router = router
        resolve(app)
      })


    })
  })
}
