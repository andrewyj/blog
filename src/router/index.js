import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Article from '../views/Article.vue'
import Archive from '../views/Archive.vue'
import PublicComment from '../views/PublicComment.vue'
import Tag from '../views/Tag.vue'
import Photo from '../views/Photo.vue'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: '文章管理',
      icon: 'form'
    },
    children: [
      {
        path: '/',
        name: 'List',
        component: List,
        meta: { title: 'Index'}
      },
      {
        path: '/article/:id(\\d+)',
        name: 'Article',
        component: Article,
        meta: { title: 'Article'}
      },
      {
        path: '/archives',
        name: 'Archive',
        component: Archive,
        meta: { title: 'Archive'}
      },
      {
        path: '/comments',
        name: 'PublicComment',
        component: PublicComment,
        meta: { title: 'Comment'}
      },
      {
        path: '/tags',
        name: 'Tag',
        component: Tag,
        meta: { title: 'Tag'}
      },
      {
        path: '/photos/:id?',
        name: 'Photo',
        component: Photo,
        meta: { title: 'Photo'}
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: { title: '404'}
  },
  { path: '*', redirect: '/404'}
]

const router = new VueRouter({
  routes
})

export default router
