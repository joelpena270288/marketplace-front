import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from 'boot/axios'
import type { User, AuthResponse } from 'src/types/auth'
import JWT from 'jwt-client'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)

  const isTokenExpired = (token: string) => {
    try {
      const session = JWT.read(token)
      const exp = session.claim?.exp
      return !exp || exp * 1000 < Date.now()
    } catch {
      return true
    }
  }

  const saveSession = (tokenValue: string, userData: User) => {
    localStorage.setItem('token', tokenValue)
    localStorage.setItem('user', JSON.stringify(userData)) // 🔹 Guardar el usuario completo
    token.value = tokenValue
    user.value = userData
  }

  const clearSession = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const loadToken = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && !isTokenExpired(savedToken) && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser) // 🔹 Restaurar usuario desde `localStorage`
    } else {
      clearSession()
    }
  }

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials)

      const session = JWT.read(data.token)
      const userData: User = {
        id: session.claim.id || 0,
        name: session.claim.name || '',
        username: session.claim.username,
        roles: session.claim.roles,
      }

      saveSession(data.token, userData)
      return true
    } catch (error) {
      console.error('Error en login:', error)
      return false
    }
  }

  const logout = () => {
    clearSession()
  }

  const getUsername = computed(() => user.value?.username || '')
  const isAuthenticated = computed(() => !!token.value)
  const hasRole = (role: string) => user.value?.roles?.some((r) => r === role) ?? false

  return { token, user, login, logout, isAuthenticated, hasRole, getUsername, loadToken }
})
