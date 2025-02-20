export interface Todo {
  id: number
  content: string
}

export interface Meta {
  totalCount: number
}
export interface Anuncios {
  titulo: string
  descripcion: string
  fecha: Date
}
export interface Persona {
  nombre: string
  cargo: string
  foto: string
  observaciones: string
}
export interface Mensajes {
  titulo: string
  texto: string
  usuario: string
}
export interface RouteMeta {
  icon?: string
  requiresAuth?: boolean
  roles?: string[]
}
