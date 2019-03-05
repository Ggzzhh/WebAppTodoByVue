const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.header['ContentType'] = 'text/html'

  const context = {
    url: ctx.path
  }

  // console.log(context)

  try {
    const appString = await renderer.renderToString(context)

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })

    ctx.body = html

  } catch (e) {
    console.log('render error: ' + e)
    throw e
  }
}
