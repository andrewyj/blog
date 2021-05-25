import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Article from '../views/Article.vue'
import Archive from '../views/Archive.vue'
import PublicComment from '../views/PublicComment.vue'

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
  },
  {
    path: '/archives',
    name: 'Archive',
    component: Archive
  },
  {
    path: '/comments',
    name: 'PublicComment',
    component: PublicComment
  }
]

const router = new VueRouter({
  routes
})

export default router
