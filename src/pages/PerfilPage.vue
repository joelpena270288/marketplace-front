<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-card-section class="text-center">
        <q-avatar size="100px">
          <img :src="user.avatar" alt="User Avatar" />
        </q-avatar>
        <q-btn flat round icon="edit" @click="editProfile" class="q-ml-sm" />
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Nombre</q-item-label>
              <q-item-label caption>{{ user.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Email</q-item-label>
              <q-item-label caption>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Teléfono</q-item-label>
              <q-item-label caption>{{ user.phone }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">Planes de Suscripción</div>
      </q-card-section>

      <q-card-section class="row justify-center">
        <q-card v-for="plan in plans" :key="plan.id" class="q-ma-md" style="width: 250px">
          <q-card-section class="text-center">
            <div class="text-h6">{{ plan.name }}</div>
            <div class="text-subtitle1">{{ plan.price }}</div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item v-for="benefit in plan.benefits" :key="benefit">
                <q-item-section>{{ benefit }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="primary" label="Suscribirse" />
          </q-card-actions>
        </q-card>
      </q-card-section>
    </q-card>

    <q-dialog v-model="isEditing">
      <q-card>
        <q-card-section>
          <q-input v-model="user.name" label="Nombre" />
          <q-input v-model="user.email" label="Email" type="email" />
          <q-input v-model="user.phone" label="Teléfono" type="tel" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Guardar" @click="saveProfile" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const user = ref({
  avatar: 'https://cdn.quasar.dev/img/avatar.png',
  name: 'Juan Pérez',
  email: 'juanperez@example.com',
  phone: '+1 809 123 4567',
})

const plans = ref([
  {
    id: 1,
    name: 'Básico',
    price: '$0/mes',
    benefits: ['Acceso en el chat y foro', 'Soporte estándar'],
  },
  {
    id: 2,
    name: 'Pro',
    price: '$0/mes',
    benefits: [
      'Acceso en el chat y foro',
      'Soporte prioritario',
      'Creación y administración tiendas virtuales',
    ],
  },
  {
    id: 3,
    name: 'Premium',
    price: '$10/mes',
    benefits: [
      'Acceso en el chat y foro',
      'Soporte VIP',
      'Creación y administración tiendas virtuales',
      'Acceso a contenido exclusivo',
    ],
  },
])

const isEditing = ref(false)

const editProfile = () => {
  isEditing.value = true
}

const saveProfile = () => {
  isEditing.value = false
  // Aquí podrías guardar los datos en el backend
}
</script>
