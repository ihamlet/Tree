import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Tree from '@/components/pages/tree/tree'
import Login from '@/components/login'
import Reg from '@/components/reg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Index,
      children: [
        {
          path: '/',
          name: 'tree',
          component: Tree,
          meta: {
            title: '族谱',
            LoginRequire: true
          }
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        LoginRequire: false
      }
    }, {
      path: '/reg',
      name: 'reg',
      component: Reg,
      meta: {
        LoginRequire: false
      }
    }
  ]
})
