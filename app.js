const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')

const less = require('./middleware/koa-less')
const addr = require('./middleware/koa-addr')

const config = require('./config')
const routers = require('./routers/index')
const cors = require('@koa/cors');


const app = new Koa()

onerror(app)

app.use(cors())

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())

app.use(addr)

// 配置控制台日志中间件
app.use(logger())

//less 中间件
app.use(less(__dirname + '/public'))

// 配置静态资源加载中间件
app.use(koaStatic(__dirname + '/public'))

// 配置服务端模板渲染引擎中间件
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.use(async (ctx) => {
  console.log(ctx.status);
  switch (ctx.status) {
    case 404:
      await ctx.render('404');
      break;
  }
})

module.exports = app
