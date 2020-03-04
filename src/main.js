// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

//引入store 并挂载到 vue上
import store from '../src/store'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
