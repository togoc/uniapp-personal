import Vue from 'vue';
import App from './App';
import store from './store';
import http from './utils/http';
import upload from './utils/upload';
import { showToast } from './utils/prompt'
import moment from 'moment';
Vue.config.productionTip = false;
moment.locale(['zh-cn'])


Vue.prototype.$http = http;
Vue.prototype.$upload = upload;
Vue.prototype.$filter = filter;
Vue.prototype.$showToast = showToast;




Vue.filter('date', filter);
Vue.filter('date1', filter1);


function filter(value) {
    return moment(value).format('YYYY/MM/DD')
}

function filter1(value) {
    return moment(value).format('lll')
}

let arr = [{ type: 'a' }, { type: 'c' }, { type: 'b' }]

console.log(arr.sort(a => a.type==='b'))

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
