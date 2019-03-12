import path from 'path'

// connect to our database file
const dataFilePath = path.join(__dirname, '../data/demo-data.sl3')

// knex is a convenient library that can connect to various SQL databases
// you can use any library you wish
const db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dataFilePath,
  },
  useNullAsDefault: true,
})

const db2 = require('knex')({
  client: 'mysql', //指明数据库类型，还可以是mysql，sqlite3等等
  //指明连接参数
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'ql',
  },
  debug: true, //指明是否开启debug模式，默认为true表示开启
  pool: {
    //指明数据库连接池的大小，默认为{min: 2, max: 10}
    min: 0,
    max: 7,
  },
  acquireConnectionTimeout: 10000, //指明连接计时器大小，默认为60000ms
  migrations: {
    // tableName: 'migrations', //数据库迁移，可选
  },
})

export default db
