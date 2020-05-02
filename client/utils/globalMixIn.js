import { mapState } from "vuex";



class GlobalMixIn {
    constructor() {

    }

    install(Vue, options) {

        Vue.mixin({
            computed: {
                isLogin() {
                    return Object.keys(this.$store.state.user).length > 3;
                }
            },
        })

    }
}


export default new GlobalMixIn()