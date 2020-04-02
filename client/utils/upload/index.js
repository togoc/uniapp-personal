let baseUrl = null
// #ifdef H5
baseUrl = '/blog/file-service/upload?type='
// #endif

// #ifndef H5
baseUrl = 'http://192.168.3.3:3000/blog/file-service/upload?type='
// #endif

/**
 * 
 * @param {String} url 
 * @param {String} method 
 * @param {Object} data 
 */
export default async function (path, type) {
    start()
    return new Promise((resolve, reject) => {

        let token = uni.getStorageSync('BLOG_TOKEN')

        uni.uploadFile({
            url: baseUrl + type,
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



