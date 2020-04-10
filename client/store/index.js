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
    indexBlogs: []
  },
  getters: {
    isLogin: state => Object.keys(state.user).length > 0
  },
  actions: {

    async getUser({ state }, id) {

      if (id) {

        let url = "/user-service/user?id=" + id
        return await http(url, "GET");

      } else {
        state.user = await http("/user-service/user");
      }

    },

    async getMyBlog({ commit, state }, type) {

      if (type === 'REFRESHMYBLOGS') {
        state.myBlogs = []
      }

      let url = "/blog-service/get-my-blog?page=" + state.myBlogs.length
      let blogs = await http(url, "GET");

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

      let url = "/blog-service/get-index-blog?page=" + state.indexBlogs.length
      let blogs = await http(url, "GET");

      blogs.length < 1
        ?
        showToast("已加载全部")
        :
        commit("SETBLOGS", blogs);
    },

    async getItemBlogByID({ state }, id) {
      let url = "/blog-service/get-index-blog?id=" + id
      return await http(url, "GET");
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
              let data = await upload(path, "avatar");
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
        return await upload(path, "blogIMG");
      } catch (error) {
        showToast(error.toString())
      }
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
      let url = "/blog-service/toggle-likes?id=" + blogID
      await http(url, "GET");
      commit("TOGGLELIKES", blogID)
    }
  },
  mutations: {
    [types.SETUSER](state, body) {
      state.user = body
    },

    [types.LOGOUT](state, body) {

      try {

        uni.removeStorageSync('BLOG_TOKEN');
        state.user = {}
        state.myBlogs = []


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
