const service = require('./../models/nrop19')

module.exports = async ( ctx , next ) => {
  await ctx.render('index')
}