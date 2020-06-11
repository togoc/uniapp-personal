import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http'
import upload from '../utils/upload'
import download from '../utils/download/download'
import { showToast } from '../utils/prompt'
import config from '../config/config'
Vue.use(Vuex)

const types = {
  SETUSER: "SETUSER",
  LOGOUT: "LOGOUT",
  SETMYBLOGS: "SETMYBLOGS",
  SETBLOGS: "SETBLOGS",
  TOGGLELIKES: "TOGGLELIKES"
}

export default new Vuex.Store({
  state: {
    name: 'togoc',
    baseAvatarURL: config.baseAvatarURL,
    user: {},
    myBlogs: [],
    indexBlogs: [],
    hotBlogs: [],
    downLoadStateArr: []
  },
  actions: {
    async getUserCount({ commit }, { id }) {


      let url = "/user-service/get-user-count"
      return await http(url, "GET", { id });
    },

    async getUser({ commit, dispatch }, id) {

      if (id) {

        let url = "/user-service/user"
        return await http(url, "GET", { id });

      } else {
        let user = await http("/user-service/user");
        let count = await dispatch('getUserCount', { id: user._id })
        commit('SETUSER', { ...user, ...count })
      }

    },

    async getMyBlog({ commit, state }, type) {

      // if (type === 'REFRESHMYBLOGS') {
      //   state.myBlogs = []
      // }

      let url = "/blog-service/get-my-blog"
      let blogs = await http(url, "GET", { page: state.myBlogs.length });

      blogs.length < 1
        ?
        showToast("已加载全部")
        :
        commit("SETMYBLOGS", blogs);

    },

    async getIndexBlog({ commit, state }) {

      let url = "/blog-service/get-index-blog"

      let blogs = await http(url, "GET", { page: state.indexBlogs.length, });

      blogs.length < 1
        ?
        showToast("已加载全部")
        :
        commit("SETBLOGS", blogs);
    },

    async getItemBlogByID({ state }, id) {
      let url = "/blog-service/get-index-blog"
      return await http(url, "GET", { id });
    },

    async signIn({ dispatch, commit }, body) {
      try {

        let data = await http("/user-service/login", "POST", body);

        let { user, token } = data;

        uni.setStorageSync("BLOG_TOKEN", token);

        let count = await dispatch('getUserCount', { id: user._id })
        commit('SETUSER', { ...user, ...count })

        uni.reLaunch({
          url: '../myhome/myhome'
        })

      } catch (error) {
        showToast('登录错误:' + error.toString())
      }
    },

    async signUp({ state }, body) {
      try {

        let data = await http("/user-service/create-user", "POST", body);

        let { user, token } = data;

        uni.setStorageSync("BLOG_TOKEN", token);

        state.user = user

        uni.switchTab({
          url: "../myhome/myhome"
        });
      } catch (error) {
        showToast('注册错误:' + error.toString())
      }
    },

    async changeAvatar({ state }) {
      try {
        uni.chooseImage({
          count: 1,
          success: res => {
            res.tempFilePaths.map(async path => {
              let data = await upload(path, { type: "avatar" });
              state.user.avatar = data.src;
            });
          },
          fail: e => {
            throw new Error(e)
          }
        });
      } catch (error) {
        showToast(error.toString())
      }
    },

    async addBlog({ state }, body) {

      await http("/blog-service/add-blog", "POST", body);

      uni.switchTab({
        url: "../myblog/myblog"
      });

    },

    async uploadImg({ state }, path) {
      try {
        return await upload(path, { type: "blogIMG" });
      } catch (error) {
        showToast(error.toString())
      }
    },

    async uploadFile({ state }, body) {
      try {
        return await upload(body.path, { type: 'file', ...body });
      } catch (error) {
        showToast(error.toString())
      }
    },

    async addFolder({ state }, body) {
      let url = '/file-service/add-folder'
      return await http(url, "GET", body)
    },

    async getFolder({ state }, body) {
      let url = '/file-service/get-folder-file'
      return await http(url, "GET", body)
    },

    /**
     *
     * @param {Object} body  { context , blogID }
     */
    async addComment({ state }, body) {
      let url = "/blog-service/add-comment"
      return await http(url, "POST", body)
    },

    async toggleLike({ commit }, blogID) {
      let url = "/blog-service/toggle-likes"
      await http(url, "GET", { id: blogID });
      commit("TOGGLELIKES", blogID)
    },

    async deleteFolderAndFile({ state }, body) {
      let url = '/file-service/delete-folder-file'
      return await http(url, "POST", body)
    },

    async renameFolderAndFile({ state }, body) {
      let url = '/file-service/rename-folder-file'
      return await http(url, "POST", body)
    },

    async downloadFile({ state }, downloadArr) {
      downloadArr.forEach(async v => {
        let arr = state.downLoadStateArr.filter(v1 => v1._id === v._id).length
        if (!arr) {
          let downloadTask = await download({ fileID: v.fileid })
          downloadTask.onProgressUpdate(res => {
            state.downLoadStateArr.forEach(v1 => {
              if (v._id === v1._id) {
                v1.progress = res.progress;
              }
            })
          })
          state.downLoadStateArr.push({ progress: 0, fileName: v.name, type: v.type, _id: v._id })
        }
      })
    }
  },
  mutations: {
    [types.SETUSER](state, body) {
      state.user = body
      state.folderPath = "/"
    },

    [types.LOGOUT](state, body) {

      try {

        uni.removeStorageSync('BLOG_TOKEN');
        state.user = {}
        state.myBlogs = []
        state.folderPath = "/"

      } catch (error) {

        showToast(error.toString());

        throw new Error('退出登录出错:' + error)

      }

    },

    [types.SETMYBLOGS](state, blogs) {
      state.myBlogs = blogs
    },

    [types.SETBLOGS](state, blogs) {
      state.indexBlogs = blogs
      state.hotBlogs = blogs.map(v => v).sort((a, b) => b.views - a.views)
    },

    [types.TOGGLELIKES](state, blogID) {
      let userID = state.user._id
      state.indexBlogs.forEach(v => {
        if (v._id === blogID) {
          let likes = v.likes
          if (likes.includes(userID)) {
            v.likes.splice(likes.indexOf(userID), 1)
          } else {
            v.likes = [...v.likes, userID]
          }
        }

      })
    },


  },
  modules: {

  }
})

