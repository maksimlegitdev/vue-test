import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('./views/List.vue')
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: () => import('./views/Contact.vue')
    }
  ]
})