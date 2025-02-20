<template>
  <q-page class="q-pa-md">
    <div class="row items-start q-gutter-md">
      <q-card flat bordered class="col">
        <MisionComponent :title="titleM" :content="contentM"></MisionComponent>
      </q-card>
      <q-card flat bordered class="col">
        <VisionComponent :title="titleV" :content="contentV"></VisionComponent>
      </q-card>
    </div>

    <q-page-container>
      <router-view />
      <WhatsAppComponent />
    </q-page-container>
  </q-page>
</template>

<script lang="ts">
import MisionComponent from 'src/components/MisionComponent.vue'
import VisionComponent from 'src/components/VisionComponent.vue'
import WhatsAppComponent from 'src/components/WhatsAppComponent.vue'

export default {
  name: 'IndexPage',
  components: {
    MisionComponent,
    VisionComponent,
    WhatsAppComponent,
  },
  data() {
    return {
      showLogin: true,
      titleV: 'Vision ',
      contentV: 'Nuestra Emp......',
      titleM: 'Mision ',
      contentM: 'Nuestra Emp......',
    }
  },
  methods: {
    toggleLogin() {
      this.showLogin = true
    },
  },
}
</script>

<style scoped>
.whatsapp-button {
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
