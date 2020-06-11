import { showToast } from '../prompt'
let baseUrl = null
// #ifdef H5
baseUrl = '/blog/file-service/download-file'
// #endif

// #ifndef H5
baseUrl = 'http://192.168.3.3:3000/blog/file-service/download-file'
// #endif

/**
 * /blog/file-service/download-file?fileID=xx
 * @param {Object} queryData 下载的文件参数
 */
export default async function (queryData = {}) {
    let token = uni.getStorageSync('BLOG_TOKEN')
    let query = ''; //数据拼接字符串
    Object.keys(queryData).forEach(key => {
        query += key + '=' + queryData[key] + '&';
    })

    return uni.downloadFile({
        url: baseUrl + '?' + query.slice(0, -1),
        name: "file",
        header: {
            Authorization: token
        },
        success: (res) => {
            let { statusCode, tempFilePath } = res
            console.log(tempFilePath)
            // #ifndef H5
            uni.saveFile({
                tempFilePath,
                success: (e) => {
                    console.log(e.savedFilePath)
                }
            })
            // #endif
        }
    });
}



