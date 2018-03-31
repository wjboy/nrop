const config = require("./../../config")
const dbconfig = config.database
const mysql = require("mysql")
const prefix = dbconfig.prefix

const pool = mysql.createPool({
  host     : dbconfig.host,
  user     : dbconfig.user,
  password : dbconfig.password,
  database : dbconfig.name,
  port     : dbconfig.port || '3306'
})


let query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

let createTable = function( sql ) {
  return query( sql, [] )
}


let findDataById = function( table,  id ) {
  let  _sql =  "SELECT * FROM ?? WHERE id = ? "
  return query( _sql, [ table, id, start, end ] )
}


let findDataByPage = function( table, keys, start, end ) {
  let  _sql =  "SELECT ?? FROM ??  LIMIT ? , ?"
  return query( _sql, [keys,  table,  start, end ] )
}


let insert = function( table, data ) {
  let [f , v] = conv(data)
  let _sql = "INSERT INTO "+prefix+table+" ("+f+") VALUES ("+v+")"
  return query( _sql )
}


let update = function( table, data, where ) {
  let f = conv_update(data)
  let _sql = "UPDATE "+prefix+table+" SET "+f+" WHERE "+where
  console.log(_sql)
  return query( _sql )
}


let deleteDataById = function( table, id ) {
  let _sql = "DELETE FROM ?? WHERE id = ?"
  return query( _sql, [ table, id ] )
}


let select = function( table, keys ) {
  let  _sql =  "SELECT ?? FROM ?? "
  return query( _sql, [ keys, table ] )
}

let count = function( table ) {
  let  _sql =  "SELECT COUNT(*) AS count FROM ?? "
  return query( _sql, [ table ] )
}

let conv = function(obj){
  let fields = [] , values = []
  for(let i in obj){
    fields.push(i)
    values.push("'"+obj[i]+"'")
  }
  return [fields.join(',') , values.join(',')]
}

let conv_update = function(obj){
  let fields = []
  for(let i in obj){
    fields.push(i + ' = ' + "'"+obj[i]+"'")
  }
  return fields.join(',')
}

let conv_and = function(obj){
  let fields = []
  for(let i in obj){
    fields.push(i + ' = ' + "'"+obj[i]+"'")
  }
  return fields.join(' and ')
}

let exist = async function(table , where){
  let f = conv_and(where)
  let _sql = "select count(*) as c from "+prefix+table+" WHERE "+f
  let result = await query( _sql )
  return result[0].c > 0
}

module.exports = {
  query,exist,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insert,
  update,
  select,
  count,
}