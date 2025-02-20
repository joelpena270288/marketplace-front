<template>
  <q-layout view="hHr lpR fff">
    <q-header reveal elevated class="indigo text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="../icons/logo.webp" />
          </q-avatar>
          JoYos Solutions
        </q-toolbar-title>
        <q-space />
        <div v-if="isAuthenticated">
          Bienvenido {{ username }}
          <q-btn icon="logout" flat dense @click="logout"></q-btn>
        </div>
        <div v-if="!isAuthenticated">
          <q-btn icon="login" flat dense @click="toggleLogin"></q-btn>
        </div>
        <!-- Mostrar el nombre del usuario -->
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item v-for="route in filteredRoutes" :key="route.path" clickable :to="route.path">
          <q-item-section avatar>
            <q-icon color="light-blue" :name="(route.meta as RouteMeta).icon ?? ''" />
          </q-item-section>
          <q-item-section>{{ route.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />

      <LoginComponent v-model:show="showLogin" />
      <OfertaComponent />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>@Copyright JoYos Solutions 2025</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useAuthStore } from '../stores/auth'
import LoginComponent from 'src/components/LoginComponent.vue'
import { useRouter } from 'vue-router'
import type { RouteMeta } from '../components/models'
import OfertaComponent from 'src/components/OfertaComponent.vue'
export default defineComponent({
  components: {
    LoginComponent,
    OfertaComponent,
  },
  setup() {
    const authStore = useAuthStore()
    const showLogin = ref(false)
    const router = useRouter()
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const username = computed(() => authStore.getUsername)

    const openLogin = () => {
      showLogin.value = true
    }

    const closeLogin = () => {
      showLogin.value = false
    }

    const logout = async () => {
      authStore.logout()
      await router.push('/')
    }
    const leftDrawerOpen = ref(false)
    const goTo = async (route: string) => {
      await router.push(route)
    }
    const filteredRoutes = computed(() => {
      return router.getRoutes().filter((route) => {
        const meta = route.meta as RouteMeta
        const requiresAuth = meta.requiresAuth || false
        const allowedRoles = meta.roles || []
        //Excluir Pagina de registro en el menu
        if (route.name === 'Registro') return false
        if (route.name === 'Pagina Error') return false
        if (route.name === 'Blanco') return false
        if (!requiresAuth) return true
        if (!authStore.isAuthenticated) return false

        return (
          allowedRoles.length === 0 ||
          allowedRoles.some((role: string) => authStore.user?.roles.includes(role))
        )
      })
    })
    return {
      showLogin,
      isAuthenticated,
      username,
      openLogin,
      closeLogin,
      logout,
      leftDrawerOpen,
      goTo,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleLogin() {
        showLogin.value = !showLogin.value
      },
      ShowUsername() {
        computed(() => authStore.getUsername)
      },
      filteredRoutes,
    }
  },
})
</script>
