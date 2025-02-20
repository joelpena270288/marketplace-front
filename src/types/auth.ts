export interface User {
  id: number
  name: string
  username: string
  roles: string[]
}

export interface AuthResponse {
  token: string
  user: User
}
const user: User = JSON.parse(localStorage.getItem('user') || '{"roles": []}')
if (user.roles.some((role) => role === 'admin')) {
  console.log('El usuario es admin')
}
