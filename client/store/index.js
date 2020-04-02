import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils//http'
Vue.use(Vuex)

const types = {
  SETUSER: "SETUSER",
  LOGOUT: "LOGOUT",
  SETMYBLOGS: "SETMYBLOGS",
  SETBLOGS: "SETBLOGS",


}


export default new Vuex.Store({
  state: {
    name: 'togoc',
    user: {},
    myBlogs: [],
    indexBlogs: []
  },
  getters: {
    isLogin: state => Object.keys(state.user).length > 0
  },
  actions: {

    async autoLogin({ commit }) {

      let data = await http("/user-service/user");
      commit("SETUSER", data);
    },
    async getMyBlog({ commit, state }) {
      let blogs = await http(
        "/blog-service/get-my-blog?page=" + state.myBlogs.length,
        "GET"
      );

      blogs.length < 1
        ?
        uni.showToast({
          title: "已加载全部",
          duration: 1000,
          icon: "none"
        })
        :
        commit("SETMYBLOGS", blogs);

    },
    async getIndexBlog({ commit, state }) {
      let blogs = await http(
        "/blog-service/get-index-blog?page=" + state.indexBlogs.length,
        "GET"
      );

      blogs.length < 1
        ?
        uni.showToast({
          title: "已加载全部",
          duration: 1000,
          icon: "none"
        })
        :
        commit("SETBLOGS", blogs);
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
        state.indexBlogs = []


      } catch (error) {
        uni.showToast({
          title: error.toString(),
          duration: 2000,
          icon: 'none'
        });
        throw new Error('退出登录出错:' + error)
      }

    },

    [types.SETMYBLOGS](state, blogs) {
      state.myBlogs = state.myBlogs.concat(blogs).sort((a, b) => b.updatedAt - a.updatedAt)
    },

    [types.SETBLOGS](state, blogs) {
      state.indexBlogs = state.indexBlogs.concat(blogs).sort((a, b) => b.updatedAt - a.updatedAt)
    },


  },
  modules: {
  }
})
