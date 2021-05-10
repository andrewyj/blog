import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import "@/style/font.css";
import "@/style/index.scss";
import AlertIns from "./utils/alert";
import Highlight from './utils/highlight';
import loading from 'vuejs-loading-screen'

Vue.prototype.$Alert = AlertIns;
Vue.use(Highlight);
Vue.use(loading, {
  bg: 'rgba(255, 255, 255, 0.68)',
  icon: 'spinner',
  size: 3,
  icon_color: '#000',
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    AOS.init()
  },
}).$mount('#app')
