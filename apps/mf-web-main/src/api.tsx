import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:10010',
  headers: { 'Content-Type': 'application/json' }
})

// Log + saneo del token (quita comillas/espacios si el backend los devuelve)
api.interceptors.request.use(cfg => {
  const raw = localStorage.getItem('jwt') || ''
  const jwt = raw.replace(/^"+|"+$/g, '').trim()
  if (jwt) {
    cfg.headers.Authorization = `Bearer ${jwt}`
    console.debug('[API] Authorization set (first 12):', jwt.slice(0, 12) + '…')
  } else {
    console.warn('[API] JWT vacío en localStorage (origen 5000)')
  }
  return cfg
})

function pickArray(x: any): any[] {
  if (Array.isArray(x)) return x
  if (x && typeof x === 'object') {
    for (const k of Object.keys(x)) {
      const arr = pickArray(x[k])
      if (arr.length) return arr
    }
  }
  return []
}

export async function fetchListadoAtenciones() {
  try {
    const { data } = await api.get('/TestFrontEnd/listadoAtenciones')
    console.debug('[API] listadoAtenciones raw:', data)
    // soporta: [], {data: []}, {Data: []}, o anidado en cualquier propiedad
    const arr =
      (Array.isArray(data) && data) ||
      (Array.isArray(data?.data) && data.data) ||
      (Array.isArray(data?.Data) && data.Data) ||
      pickArray(data)
    return arr
  } catch (e: any) {
    const st = e?.response?.status
    console.error('[API] listadoAtenciones error:', st, e?.response?.data || e?.message)
    throw e
  }
}
