import { mapState } from "vuex";



class GlobalMixIn {
    constructor() {

    }

    install(Vue, options) {

        Vue.mixin({
            computed: {
                ...mapState({
                    isLogin: state => state.isLogin,
                    user: state => state.user,
                })
            },
        })

    }
}


export default new GlobalMixIn()