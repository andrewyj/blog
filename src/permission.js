import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
  document.title = to.meta.title + ' | ' + store.getters.settings.title
  
  // do something
  next()
})

