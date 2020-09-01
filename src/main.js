import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';

import axios from 'axios'
Vue.prototype.axios = axios
import qs from 'querystring'
Vue.prototype.qs = qs

Vue.use(ElementUI);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
