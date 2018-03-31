const service = require('./../models/nrop19')
const base = require('../utils/base')
const request = require('request')

const cats = [
  {title:'默认',key:''},
  {title:'当前最热',key:'hot'},
  {title:'最近得分',key:'rp'},
  {title:'10分钟以上',key:'long'},
  {title:'最近加精',key:'rf'},
  {title:'本月最热',key:'top'},
  {title:'本月收藏',key:'tf'},
  {title:'收藏最多',key:'mf'},
  {title:'高清',key:'md'},
]

const channals = [
  {title:'nrop19',key:'nrop19'},
]

const channal = 'nrop19'

module.exports = {

  async list(ctx) {
    let result = {
      status: 0,
      data: null,
    }

    let { page = 1 , cat = ''} = ctx.query


    if (page < 1) page = 1

    let data = await service.list(page , cat)

    result.data = data

    result.count = data.length

    ctx.body = result

  },

  async listPage(ctx){
    let { page = 1 , cat = ''} = ctx.query


    if (page < 1) page = 1

    let data = await service.list(page , cat)

    await ctx.render('index',{
      data , page:parseInt(page) , cat , cats , channal , channals
    })
  },

  async detail(ctx){
    let result = {
      status: 0,
      data: null,
    }
    let {id} = ctx.params
    let data = await service.detail(id)
    result.data = data
    ctx.body = result

  },

  async detailPage(ctx){
    let {id} = ctx.params
    let proxy = ctx.query.p
    let data = await service.detail(id)

    if(proxy) data.url = '/api/nrop19/play/' + base.base64_encode(data.url)
    await ctx.render('detail',{
      data
    })

  },

  async play(ctx){
    let url = base.base64_decode(ctx.params.id)
    ctx.body = ctx.req.pipe(request(url))

  }
}