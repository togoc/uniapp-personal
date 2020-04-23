const mongoose = require('mongoose')
const env = require('../enviroment/env')
mongoose.connect(env.mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.on('error', (err) => {
    console.error('数据库连接出错:' + err)
})
mongoose.connection.on('connected', () => {
    console.log('数据库已连接:' + env.mongoURL)
})
module.exports = mongoose