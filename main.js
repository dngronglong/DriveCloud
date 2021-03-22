import Vue from 'vue'
import App from './App'


import http from 'common/request'

Vue.config.productionTip = false

Vue.prototype.uni=http

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
