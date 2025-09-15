import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})


function tryParse<T = any>(raw: any): T | null {
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) as T } catch { return null }
  }
  return (raw ?? null) as T | null
}


function extractToken(payload: any): string | null {
  const data = tryParse(payload) ?? payload ?? {}
  const direct =
    data?.data?.token ??
    data?.token ??
    data?.data?.Data?.token ??
    data?.Data?.token ??
    data?.jwt ??
    data?.data?.jwt
  if (typeof direct === 'string' && direct.length > 0) return direct

  
  const raw = typeof payload === 'string' ? payload : JSON.stringify(payload)
  const m = raw.match(/\beyJ[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+/i)
  return m ? m[0] : null
}

export async function loginRequest(usuario: string, perfil: string) {
  const res = await api.post('/Auth/', { usuario, perfil })
  console.log('[Auth][raw]', res.data)
  const token = extractToken(res.data)
  if (!token) throw new Error('No se recibió token')
  return token
}
