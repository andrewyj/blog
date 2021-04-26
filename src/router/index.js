import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/article/:id(\\d+)',
    name: 'Article',
    component: Article
  }
]

const router = new VueRouter({
  routes
})

export default router
