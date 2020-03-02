

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import TodoList from '../components/TodoList.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Todo',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/',
      name: 'TodoList',
      component: TodoList
    }
  ]
})
