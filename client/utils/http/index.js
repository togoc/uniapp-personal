let baseUrl = null
// #ifdef H5
baseUrl = '/blog'
// #endif

// #ifndef H5
baseUrl = 'http://192.168.3.3:3000/blog'
// #endif

/**
 * 
 * @param {String} url 
 * @param {String} method 
 * @param {Object} data 
 */
export default async function (url, method = 'GET', data) {
    start()

    return new Promise((resolve, reject) => {

        let token = uni.getStorageSync('BLOG_TOKEN')

        uni.request({
            url: baseUrl + url, 

            data,

            method,

            header: {
                Authorization: token
            },

            success: (res) => {
                // code 500
                if (res.statusCode === 500) {
                    uni.showToast({
                        title: res.data || '请求错误',
                        duration: 2000,
                        icon: 'none'
                    });
                    return reject(res.data)
                }

                //code 401
                if (res.statusCode === 401) {
                    uni.showToast({
                        title: res.data || '登录信息过期',
                        duration: 2000,
                        icon: 'none'
                    });
                    return reject(res.data)
                }

                resolve(res.data)

            },

            fail: (e) => {
                reject(e)
                end()
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

