import Vue from 'vue'
import App from './App'
import store from './store'
import http from './utils/http'
import moment from 'moment'
Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$filter = filter


Vue.filter('date', filter)

function filter(value) {
    return moment(value).format('YYYY/MM/DD')
}

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
