const router = require('koa-router')()

const home = require('./home')

const page = require('./page')

const api = require('./api')


router.use('/page', page.routes(), page.allowedMethods())

router.use('/api', api.routes(), api.allowedMethods())

router.use('/' , home.routes(), home.allowedMethods())

module.exports = router
