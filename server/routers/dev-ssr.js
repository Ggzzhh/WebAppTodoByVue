const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
// 跟fs的api一样 不过是虚拟的
const MemoryFs = require('memory-fs')
const webpack =require('webpack')
const VueServerRenderer = require('vue-server-renderer')


const serverConfig = require('../../build/webpack.config.server')


const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJSON()
  stats.errors.forEach(err => console.log(err))
  stats.hasWarnings.forEach(warn => console.log(warn))

  const bundlePathe = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePathe, 'uft-8'))

})


const handleSSR = async (ctx) => {
  if (bundle) {
    ctx.body = '请等一下，别急.....'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs')
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

}
