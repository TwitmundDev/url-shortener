import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import LoginView from '@/views/Login.vue'
import NotFound from '@/views/_base/404.vue'
import Dashboard from '@/views/dashboard/HomeDashboard.vue'
import Register from "@/views/Register.vue";
import AuthMiddleware from "@/middleware/auth.js";
import {isBackendUp} from "@/services/health.js";
import Unavailable from "@/views/Unavailable.vue";




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        middleware: [AuthMiddleware]
      }

    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/:pathMatch(.*)*',
      name: "404NotFound",
      component: NotFound
    },
    { path: '/backend-down', name: 'BackendDown', component: Unavailable },
  ],
})

router.beforeEach(async (to) => {
  if (to.name === 'BackendDown') return true;
  const up = await isBackendUp();
  if (!up) return { name: 'BackendDown' };
  return true;
});

export default router
