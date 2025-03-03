import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../pages/DashboardPage.vue'
import IndexPage from 'src/pages/IndexPage.vue'
import { createRouterGuard } from './router-guard'
import RegistroPage from 'src/pages/RegistroPage.vue'
import PerfilPage from 'src/pages/PerfilPage.vue'
import DashboardUserPage from 'src/pages/DashboardUserPage.vue'
import AllProducts from 'src/pages/AllProducts.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Blanco',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Inicio',

        component: IndexPage,
        meta: { icon: 'home' },
      },
      {
        path: '/perfil',
        name: 'Perfil de Usuario',
        component: PerfilPage,
        meta: {
          icon: 'account_circle',
          requiresAuth: true,
          roles: ['admin', 'estandar', 'premiun'],
        },
      },
      {
        path: '/dashboard',
        name: 'Panel de Control',

        component: Dashboard,
        meta: { icon: 'admin_panel_settings', requiresAuth: true, roles: ['admin'] },
      },
      {
        path: '/dashboard_premiun',
        name: 'Administración',

        component: DashboardUserPage,
        meta: { icon: 'admin_panel_settings', requiresAuth: true, roles: ['premiun'] },
      },
      {
        path: '/shops',
        name: 'Tiendas',
        component: Dashboard,
        meta: { icon: 'storefront' },
      },
      {
        path: '/product',
        name: 'Productos',
        component: AllProducts,
        meta: { icon: 'inventory' },
      },

      {
        path: '/services',
        name: 'Servicios Disponibles',
        component: Dashboard,
        meta: { icon: 'find_in_page' },
      },

      {
        path: '/forum',
        name: 'Foro',

        component: Dashboard,
        meta: { icon: 'forum', requiresAuth: true, roles: ['admin', 'estandar'] },
      },
      {
        path: '/chat',
        name: 'Chat',

        component: Dashboard,
        meta: { icon: 'chat', requiresAuth: true, roles: ['admin', 'estandar'] },
      },
      {
        path: '/registro',
        name: 'Registro',

        component: RegistroPage,
      },
      {
        path: '/:catchAll(.*)*',
        name: 'Pagina Error',
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
createRouterGuard(router)
export default routes
