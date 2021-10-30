import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import ChooseObject from '../views/ChooseObject.vue'
import AskQuestion from '../views/AskQuestion.vue'
import PickAttribute from '../views/PickAttribute.vue'
import GameOver from '../views/GameOver.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/choose-object',
    name: 'ChooseObject',
    component: ChooseObject
  },
  {
    path: '/pick-attribute',
    name: 'PickAttribute',
    component: PickAttribute
  },
  {
    path: '/ask-question',
    name: 'AskQuestion',
    component: AskQuestion
  },
  {
    path: '/game-over',
    name: 'GameOver',
    component: GameOver
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
