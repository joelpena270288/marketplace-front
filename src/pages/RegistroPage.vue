<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Registro de Usuario</div>
      </q-card-section>

      <q-form @submit="register" ref="registerForm">
        <q-card-section>
          <q-input
            v-model="form.name"
            label="Nombre"
            :rules="[(val) => !!val || 'El nombre es obligatorio']"
            filled
          />
          <q-input
            v-model="form.email"
            label="Correo Electrónico"
            type="email"
            :rules="[(val) => /.+@.+\..+/.test(val) || 'Correo inválido']"
            filled
          />
          <q-input
            v-model="form.username"
            label="Nombre de Usuario"
            :rules="[
              (val) => !!val || 'El nombre de usuario es obligatorio',
              (val) => val.length >= 4 || 'Mínimo 4 caracteres',
              (val) => /^[a-zA-Z0-9_]+$/.test(val) || 'Solo letras, números y guiones bajos',
            ]"
            filled
          />
          <q-input
            v-model="form.password"
            label="Contraseña"
            type="password"
            :rules="[(val) => val.length >= 6 || 'Mínimo 6 caracteres']"
            filled
          />
          <q-input
            v-model="form.confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            :rules="[(val) => val === form.password || 'Las contraseñas no coinciden']"
            filled
          />
          <q-input
            v-model="form.verificationCode"
            label="Código de Verificación"
            :rules="[(val) => val.length === 6 || 'Código de 6 dígitos']"
            filled
            v-if="showVerificationCode"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Enviar Código"
            @click="sendVerificationCode"
            color="secondary"
            v-if="!showVerificationCode"
          />
          <q-btn label="Registrar" type="submit" color="primary" :disable="!showVerificationCode" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'

const $q = useQuasar()
const registerForm = ref<InstanceType<typeof HTMLFormElement> | null>(null)
const showVerificationCode = ref(false)

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  verificationCode: '',
  username: '',
})
const sendVerificationCode = async () => {
  if (!/.+@.+\..+/.test(form.value.email)) {
    $q.notify({ type: 'negative', message: 'Ingrese un correo válido' })
    return
  }

  try {
    const response = await api.post('http://localhost:3000/mail/send-code', {
      email: form.value.email,
    })
    $q.notify({ type: 'positive', message: 'Código enviado al correo' })
    console.log('Código de verificación:', response.data.code) // Solo para pruebas
  } catch {
    $q.notify({ type: 'negative', message: 'Error al enviar el código' })
  }
}
const validateVerificationCode = async () => {
  try {
    const response = await api.post('http://localhost:3000/verification-code/validate-code', {
      email: form.value.email,
      code: form.value.verificationCode,
    })

    if (response.data.success) {
      $q.notify({ type: 'positive', message: 'Código validado correctamente' })
      return true
    } else {
      $q.notify({ type: 'negative', message: 'Código incorrecto o expirado' })
      return false
    }
  } catch {
    $q.notify({ type: 'negative', message: 'Error en la validación' })
    return false
  }
}

const register = () => {
  if (registerForm.value) {
    registerForm.value.validate().then(async (success: boolean) => {
      if (success) {
        const isCodeValid = await validateVerificationCode()
        if (!isCodeValid) return

        $q.notify({ type: 'positive', message: 'Registro exitoso' })
        // Llamar a la API para registrar al usuario
      }
    })
  }
}
</script>

<style scoped>
.q-card {
  max-width: 400px;
}
</style>
