import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import "@/style/font.css";
import "@/style/index.scss";
import AlertIns from "./utils/alert";
import Highlight from './utils/highlight';

Vue.prototype.$Alert = AlertIns;
Vue.use(Highlight);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    AOS.init()
  },
}).$mount('#app')
