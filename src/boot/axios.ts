import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Base de la API (se redirige con proxy)
  headers: {
    'Content-Type': 'application/json',
  },
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
