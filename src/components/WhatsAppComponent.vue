<template>
  <q-btn
    class="whatsapp-button"
    fab
    color="green"
    icon="img:https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    @click="openWhatsApp"
  />
</template>

<script lang="ts" setup>
const phoneNumber = '+18496205493' // Número en formato internacional
const message = encodeURIComponent('Hola, quiero más información.')

const openWhatsApp = () => {
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}
</script>

<style scoped>
.whatsapp-button {
  position: fixed;
  bottom: 50px;
  right: 20px;
  z-index: 1000;
  animation: bubble 2s infinite ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.whatsapp-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4);
}

@keyframes bubble {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
