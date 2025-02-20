import type { Router } from 'vue-router'
import { useQuasar } from 'quasar'
//import type { Role } from '../constants/roles'

export function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : null

    // 🔹 Asegurar que userRoles sea un array
    const userRoles: string[] = Array.isArray(user?.roles) ? user.roles : ['guest']

    if (to.meta.requiresAuth && userRoles.includes('guest')) {
      const $q = useQuasar()
      console.warn('[NAV] Usuario no autenticado')
      $q.notify({
        type: 'negative',
        message: '¡No tienes Permiso!',
        position: 'top-right',
      })
      return next('/')
    }

    if (Array.isArray(to.meta.roles)) {
      // 🔹 Verificar si al menos un rol del usuario está permitido
      const hasAccess = to.meta.roles.some((role: string) => userRoles.includes(role))

      if (!hasAccess) {
        console.warn(
          `[NAV] Acceso denegado: Roles "${userRoles.toString()}" no permitidos en esta ruta`,
        )
        const $q = useQuasar()
        console.warn('[NAV] Usuario no autenticado')
        $q.notify({
          type: 'negative',
          message: '¡No tienes Permiso!',
          position: 'top-right',
        })
        return next('/') // 🔹 Redirigir a una ruta válida
      }
    }

    next()
  })
}
