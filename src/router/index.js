import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import UserForm from '@/components/form/user-form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/user-form',
      name: 'UserForm',
      component: UserForm
    }
  ]
})
