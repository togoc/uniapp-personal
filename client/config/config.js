let baseUrl = null
// #ifdef H5
baseUrl = '/blog'
// #endif
//106.13.184.92
// #ifndef H5
baseUrl = 'http://192.168.3.3:3000/blog'
// #endif

let baseAvatarURL = process.env.baseAvatarURL || 'http://192.168.3.3:3000/blog/file-service/img/'



export default {
    baseUrl,
    baseAvatarURL
}