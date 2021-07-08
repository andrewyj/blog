import router from './router'
import store from './store'
import AlertIns from "./utils/alert";

router.beforeEach(async(to, from, next) => {
  if (!store.getters) {
    try {
      await store.dispatch('settings/getOptions')
      next()
    } catch (error) {
      AlertIns.message({
        content: error || 'Has Error',
        duration: 3
      });
    }
  }
  next()
})

