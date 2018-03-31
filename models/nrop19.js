
const http = require('../utils/http')

const base = require('../utils/base')

const host = base.base64_decode( require('../config').host.nrop19 )


const data = {
  async list(page , cate){
    let resp = await http.get(host+'v.php?page='+page+'&category='+cate)
    let data = []
    resp.replace(/viewkey=([0-9a-z]+)[^<]+?\s*<img\s+src="([^"]+?)"[\w\W]+?title="([^"]+?)"/g , ($0 , $1, $2, $3)=>{
      data.push({
        viewkey : $1 , 
        thumb : $2.replace(/http:/,'https:') ,
        img : $2.replace(/http:/,'https:').replace(/\d+_/,''),
        title : $3
      })
      return ''
    })
    return data
  },

  async detail(viewkey){
    let resp = await http.get(host+'view_video.php?viewkey='+viewkey , true)

    let url = (resp.match(/source\s*src\s*=\s*"([^"]+)/) || ['',''])[1]

    let img = (resp.match(/poster\s*=\s*"([^"]+)/) || ['',''])[1]

    let title =(resp.match(/viewvideo-title">([^<]+)/) || ['',''])[1].replace(/[\r\n\s]/g,'')  

    return { title , url, img}
  },


}

module.exports = data