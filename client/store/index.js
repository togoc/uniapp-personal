import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const types = {
  SETUSER: "SETUSER",
  LOGOUT: "LOGOUT"

}


export default new Vuex.Store({
  state: {
    name: 'togoc',
    user: {}
  },
  actions: {

  },
  mutations: {
    [types.SETUSER](state, body) {
      state.user = body
    },
    [types.LOGOUT](state, body) {
      
      uni.removeStorageSync('BLOG_TOKEN');

      state.user = {}
    },
  },
  modules: {
  }
})
