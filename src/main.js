import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-icons/iconfont/material-icons.css'

import utils from '@/services/utils';

Vue.config.productionTip = false

Vue.prototype.$utils = utils;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
