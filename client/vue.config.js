
module.exports = {
    devServer: {
        proxy: { // 配置跨域(要重启端口才生效)
            '/blog': {
                target: 'http://192.168.3.3:3000',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/blog': '/blog'
                }
            }
        }
    }
}