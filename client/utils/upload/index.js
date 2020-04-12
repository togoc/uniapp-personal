import { showToast } from '../prompt'
let baseUrl = null
// #ifdef H5
baseUrl = '/blog/file-service/upload'
// #endif

// #ifndef H5
baseUrl = 'http://192.168.3.3:3000/blog/file-service/upload'
// #endif

/**
 * 
 * @param {String} url 
 * @param {String} method 
 * @param {Object} data 
 */
export default async function (path, queryData = {}) {
    start()
    return new Promise((resolve, reject) => {

        let token = uni.getStorageSync('BLOG_TOKEN')
        let query = ''; //数据拼接字符串
        Object.keys(queryData).forEach(key => {
            query += key + '=' + queryData[key] + '&';
        })
        uni.uploadFile({
            url: baseUrl + '?' + query,
            filePath: path,
            name: "file",
            header: {
                Authorization: token
            },
            success: res => {
                end();
                resolve(JSON.parse(res.data));
            },
            fail: (e) => {
                end();
                showToast(e.toString())
                reject(e);
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



