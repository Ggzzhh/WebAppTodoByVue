const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'ThrowG' && user.password === 'ThrowG'){
    ctx.session.user = {
      username: 'jokey'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'ThorwG'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
