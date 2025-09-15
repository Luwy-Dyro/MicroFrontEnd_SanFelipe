import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:10010',
})

api.interceptors.request.use(cfg => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) cfg.headers.Authorization = `Bearer ${jwt}`
  return cfg
})

// helpers
export const getEstadosAtencion = () => api.get('/TestFrontEnd/estadosAtencion')
export const getListadoAtenciones = () => api.get('/TestFrontEnd/listadoAtenciones')
