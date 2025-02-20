<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.loadToken() // 🔹 Restaurar sesión al iniciar la app
})
</script>
