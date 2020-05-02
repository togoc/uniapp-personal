
import { showToast } from '../prompt'
import config from '../../config/config'


/**
 * 
 * @param {String} url 
 * @param {String} method 
 * @param {Object} data 
 */
export default async function (url, method = 'GET', data = {}) {
    start()

    return new Promise((resolve, reject) => {

        let token = uni.getStorageSync('BLOG_TOKEN')
        let query = ''; //数据拼接字符串

        if (method === "GET") {
            Object.keys(data).forEach(key => {
                query += key + '=' + data[key] + '&';
            })
        }

        uni.request({
            url: config.baseUrl + url,

            data,

            method,

            header: {
                Authorization: token
            },

            success: (res) => {
                // code 500
                if (res.statusCode === 500) {
                    showToast(res.data || '请求错误');
                    return reject(res.data)
                }

                //code 401
                if (res.statusCode === 401) {
                    showToast(res.data || '登录信息过期');
                    return reject(res.data)
                }

                resolve(res.data)

            },

            fail: (e) => {
                end()
                showToast(e.toString())
                reject(e)
            },

            complete: () => {
                end()
            }

        });
    })

}


function start() {
    uni.showLoading({
        title: '加载中',
        mask: true
    });
}


function end() {
    uni.hideLoading();
}

