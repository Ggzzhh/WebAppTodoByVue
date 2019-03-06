import createApp  from './create-app'


export default context => {
  return new Promise((resolve, reject) => {
    const {app, router} = createApp()

    // console.log(context)

    router.push(context.url)

    router.onReady(() => {
      // 根据url做一些操作
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no components matched! '))
      }

      context.meta = app.$meta()

      resolve(app)
    })
  })
}
