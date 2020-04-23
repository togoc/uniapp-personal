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
    start('开始上传')
    return new Promise((resolve, reject) => {

        let token = uni.getStorageSync('BLOG_TOKEN')
        let query = ''; //数据拼接字符串
        Object.keys(queryData).forEach(key => {
            query += key + '=' + queryData[key] + '&';
        })
        const uploadTask = uni.uploadFile({
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

        uploadTask.onProgressUpdate((res) => {
            start(`${res.progress}%`)
            // console.log('已经上传的数据长度' + res.totalBytesSent);
            // console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

            // 测试条件，取消上传任务。
            // if (res.progress > 50) {
            //     uploadTask.abort();
            // }
        });
    })

}


function start(title) {
    uni.showLoading({
        title,
        mask: true
    });
}


function end() {
    uni.hideLoading();
}




