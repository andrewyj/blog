import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Article from '../views/Article.vue'
import Archive from '../views/Archive.vue'
import About from '../views/About.vue'
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
        path: '/about',
        name: 'About',
        component: About,
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
    component: () => import('@/views/Error'),
    meta: { title: '404'},
    props: { message: 'The page you are looking for is not found.' }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/Error'),
    meta: { title: '500'},
    props: { message: 'Something went wrong please try again.' }
  },
  { path: '*', redirect: '/404'}
]

const router = new VueRouter({
  routes
})

export default router
