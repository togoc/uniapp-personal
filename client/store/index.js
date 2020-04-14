import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http'
import upload from '../utils/upload'
import { showToast } from '../utils/prompt'
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
    baseAvatarURL: process.env.baseAvatarURL || 'http://192.168.3.3:3000/blog/file-service/img/',
    user: {},
    myBlogs: [],
    indexBlogs: [],
  },
  getters: {
    isLogin: state => Object.keys(state.user).length > 0
  },
  actions: {

    async getUser({ commit }, id) {

      if (id) {

        let url = "/user-service/user"
        return await http(url, "GET", { id });

      } else {
        let user = await http("/user-service/user");
        commit('SETUSER', user)
      }

    },

    async getMyBlog({ commit, state }, type) {

      if (type === 'REFRESHMYBLOGS') {
        state.myBlogs = []
      }

      let url = "/blog-service/get-my-blog"
      let blogs = await http(url, "GET", { page: state.myBlogs.length });

      blogs.length < 1
        ?
        showToast("已加载全部")
        :
        commit("SETMYBLOGS", blogs);

    },

    async getIndexBlog({ commit, state }, type) {

      if (type === "REFRESHBLOGS") {
        state.indexBlogs = []
      }

      let url = "/blog-service/get-index-blog"
      let blogs = await http(url, "GET", { page: state.indexBlogs.length });

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

    async signIn({ state }, body) {
      try {

        let data = await http("/user-service/login", "POST", body);

        let { user, token } = data;

        uni.setStorageSync("BLOG_TOKEN", token);

        state.user = user

        uni.switchTab({
          url: "../myhome/myhome"
        });

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
      state.myBlogs = state.myBlogs.concat(blogs)
    },

    [types.SETBLOGS](state, blogs) {
      state.indexBlogs = state.indexBlogs.concat(blogs)
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
    }
  },
  modules: {

  }
})
