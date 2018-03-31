/**
 * 主页子路由
 */

const router = require('koa-router')()
const index = require('../controllers/index')
const nrop19 = require('./../controllers/nrop19')

module.exports = router.get('/nrop19/list', nrop19.listPage)
module.exports = router.get('/nrop19/:id', nrop19.detailPage)