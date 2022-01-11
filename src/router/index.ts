import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import ChooseObject from '../views/ChooseObject.vue'
import AskQuestion from '../views/AskQuestion.vue'
import PickAttribute from '../views/PickAttribute.vue'
import GameOver from '../views/GameOver.vue'
import SessionTimeout from '../views/SessionTimeout.vue'
import { get } from "../helpers/http";

async function redirectIfNoObjectSelected (to, from, next) {
  const user = await get<string>("/api/select");
  if (user.length == 0) {
    next({
      name: "Home"
    });
  } else {
    next()
  }
}

async function redirectIfNoLanguageSelected (to, from, next) {
  const language = await get<string>("/api/learn-language");
  if (language['learn-language'].length == 0) {
    next({
      name: "Home"
    });
  } else {
    next()
  }
}


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/terms_privacy',
    name: 'TermsPrivacy',
    component: () => import('../views/TermsPrivacy.vue')
  },

  {
    path: '/choose-object',
    name: 'ChooseObject',
    component: ChooseObject,
    beforeEnter: redirectIfNoLanguageSelected
  },
  {
    path: '/pick-attribute',
    name: 'PickAttribute',
    component: PickAttribute,
    beforeEnter: redirectIfNoObjectSelected
  },
  {
    path: '/ask-question',
    name: 'AskQuestion',
    component: AskQuestion,
    beforeEnter: redirectIfNoObjectSelected
  },
  {
    path: '/game-over',
    name: 'GameOver',
    component: GameOver,
    beforeEnter: redirectIfNoObjectSelected
  },
  {
    path: '/session-timeout',
    name: 'SessionTimeout',
    component: SessionTimeout,
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
