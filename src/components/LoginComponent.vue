<template>
  <q-dialog v-model="localShow" class="login-page">
    <q-card flat bordered class="login-card">
      <q-card-section>
        <div class="text-h6">Inicio de Sesión</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="username" label="Nombre de Usuario" outlined>
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Contraseña"
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="row justify-center">
            <q-btn
              type="submit"
              label="Ingresar"
              color="primary"
              class="full-width q-mt-md"
              unelevated
            />
          </div>
          <div class="row justify-center">
            <p class="text-grey-6">
              <a href="/registro">No está resgistrado? Crea una Cuenta</a>
            </p>
          </div>
          <div class="row justify-center">
            <p class="text-grey-6">
              <a href="/forgot-password">Olvidó su contraseña?</a>
            </p>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const authStore = useAuthStore()
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const localShow = ref(props.show)
    const $q = useQuasar()

    watch(
      () => props.show,
      (newVal) => {
        localShow.value = newVal
      },
    )

    watch(localShow, (newVal) => {
      emit('update:show', newVal) // Esto sincroniza el estado con el padre
    })

    const onSubmit = async () => {
      if (username.value !== '' && password.value !== '') {
        if (await authStore.login({ username: username.value, password: password.value })) {
          username.value = '' // 🔹 Limpiar el campo de usuario
          password.value = '' // 🔹 Limpiar el campo de contraseña
          emit('update:show', false)

          await router.push('/')
          $q.notify({
            type: 'positive',
            message: '¡Inicio de sesión exitoso!',
            position: 'top-right',
          })
        } else {
          $q.notify({
            type: 'negative',
            message: '¡Error de autenticación!',
            position: 'top-right',
          })
        }
      } else {
        $q.notify({
          type: 'negative',
          message: '¡Llene los campos!',
          position: 'top-right',
        })
      }
    }

    return {
      username,
      password,
      localShow,
      onSubmit,
      isPwd: ref(true),
    }
  },
})
</script>
<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
.login-card {
  width: 100%;
  max-width: 400px;
}
.full-width {
  width: 100%;
}
</style>
