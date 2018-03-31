
const router = require('koa-router')()


module.exports = router.get('/', (ctx , next)=>{
  ctx.redirect('/page/nrop19/list')
})
