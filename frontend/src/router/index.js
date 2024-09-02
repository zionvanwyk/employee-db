import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LandingLayout from '@/views/LandingLayout.vue'
import OrganogramView from '@/views/OrganogramView.vue'
import SettingsView from '@/views/SettingsView.vue'
import AppHeader from '@/views/AppHeader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginView
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterView
        }
      ]
    },
    {
      path: '/app',
      component: AppHeader,
      children: [
        {
          path: 'home',
          component: HomeView
        },
        {
          path: 'settings',
          component: SettingsView
        },
        {
          path: 'organogram',
          component: OrganogramView
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/:catchAll(.*)', // Catch-all route for 404 pages
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('token')

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    // User is not authenticated, redirect to login page
    console.log('User is not authenticated, redirect to login page')
    next('/login')
  } else {
    next()
  }
})

export default router
