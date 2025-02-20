<template>
  <transition name="fade">
    <div v-if="showBanner" class="offer-banner">
      <q-banner dense class="bg-primary text-white" rounded>
        <q-icon name="local_offer" class="q-mr-sm" />
        📢 ¡Oferta Especial! 20% de descuento hasta el viernes. 🎉
        <q-btn flat dense icon="close" @click="closeBanner" class="close-btn" />
      </q-banner>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const showBanner = ref(true)

    const closeBanner = () => {
      showBanner.value = false
    }

    // Cerrar automáticamente después de 10 segundos (opcional)
    onMounted(() => {
      setTimeout(() => {
        showBanner.value = false
      }, 20000)
    })

    return { showBanner, closeBanner }
  },
})
</script>

<style scoped>
.offer-banner {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 250px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}

/* Efecto de aparición/desaparición */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
