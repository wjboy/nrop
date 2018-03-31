/*
 * api 路由
 */
const router = require('koa-router')()

const nrop19 = require('./../controllers/nrop19')


const routers = router//.prefix('/api')
    // .post('/signin', user.signin)
    // .post('/signup', user.signup)

    .get('/nrop19/list' , nrop19.list)
    .get('/nrop19/:id' , nrop19.detail)
    .get('/nrop19/play/:id' , nrop19.play)
    
module.exports = routers
