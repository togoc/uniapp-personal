/**
 * 没有规划好不是所有的key都有用到.
 */
const path = require('path')
module.exports = {
  key: process.env.KEY || "1234",
  newKey: process.env.NEW_KEY || "1234",
  salt: process.env.SALT || "1234",
  password: process.env.PASSWORD || "1234",
  jwtKey: process.env.JWTKEY || "1234", // 加密token用
  root: process.env.ROOT || path.resolve(__dirname, '../'),
  url: process.env.URL || 'localhost',
  fullUrl: process.env.FULLURL || 'http://localhost',
  mongoURL: process.env.MONGODB_URL,
  mongoUser: process.env.DBUSER,
  mongoPass: process.env.DBPASS,
}