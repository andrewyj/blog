import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import "@/style/font.css"
import "@/style/index.scss"
import AlertIns from "./utils/alert"
import Highlight from './utils/highlight'
import loading from 'vuejs-loading-screen'
import '@/permission' // permission control

Vue.prototype.$Alert = AlertIns;
Vue.use(Highlight);
Vue.use(loading, {
  bg: 'rgba(255, 255, 255, 0.68)',
  icon: 'spinner',
  size: 3,
  icon_color: '#000',
})

try {
  store.dispatch('settings/getOptions', function(state) {

    // 更换 icon
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link')
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = state.icon;
    document.getElementsByTagName('head')[0].appendChild(link)

    // 启动 vue
    new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        AOS.init()
      },
    }).$mount('#app')
  })
} catch (error) {
  AlertIns.message({
    content: error || 'Has Error',
    duration: 3
  });
}