const path = require('path')
module.exports = {
    key: process.env.KEY || "1234",
    newKey: process.env.NEW_KEY || "1234",
    password: process.env.PASSWORD || "1234",
    root: process.env.ROOT || path.resolve(__dirname, '../'),
    url: process.env.URL || 'localhost',
    fullUrl: process.env.FULLURL || 'http://localhost',
    mongoURL: process.env.MONGODB_URL
}