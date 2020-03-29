import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils//http'
Vue.use(Vuex)

const types = {
  SETUSER: "SETUSER",
  LOGOUT: "LOGOUT"

}


export default new Vuex.Store({
  state: {
    name: 'togoc',
    user: {},
    myBlogs: []
  },
  getters: {
    isLogin: state => Object.keys(state.user).length > 0
  },
  actions: {

    async autoLogin({ commit }) {

      let res = await http("/user-service/user");
      let data = res.data;
      commit("SETUSER", data);

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
        uni.showToast({
          title: error.toString(),
          duration: 2000,
          icon: 'none'
        });
        throw new Error('退出登录出错:' + error)
      }

    },


  },
  modules: {
  }
})
