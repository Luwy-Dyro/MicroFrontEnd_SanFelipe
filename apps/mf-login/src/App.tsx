import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from './api'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

export default function LoginApp() {
  const [usuario, setUsuario] = useState('test')
  const [perfil, setPerfil]   = useState('admin')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const token = await loginRequest(usuario, perfil)
      localStorage.setItem('jwt', token)
      navigate('/home', { replace: true })
    } catch (err: any) {
      setError(err?.message ?? 'Error de autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh w-full grid place-items-center back_body">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 bacgk_login">
        <div className="text-center mb-6">
          
          <img src="https://citaweb.clinicasanfelipe.com/CSF_CITAS//Resources/Images/Login/logo.png" alt="Clinica San Felipe" />
          
          <b className="mt-5 text-3xl block font-semibold text-white">Iniciar sesión</b>
          <p className='text-gray-200'> Inicia sesión para accedr a la História Clinica Electrónica (HCE)</p>
        </div>

        <label className="block mb-2 text-sm font-medium text-white ">Login</label>
        <input
          className="w-full rounded-md  border px-4 py-2 mb-4 outline-none focus:ring-2 bg-white focus:ring-blue-600 text-gray-400"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          placeholder="Ingrese su nombre"
          required
        />

        <label className="block mb-2 text-sm font-medium text-white">Perfil</label>
        <select
          className="w-full rounded-md bg-white border px-4 py-2 mb-8 outline-none focus:ring-2 focus:ring-blue-600  text-gray-400"
          value={perfil}
          onChange={e => setPerfil(e.target.value)}
        >
          <option value="admin">admin</option>
          <option value="medico">medico</option>
          <option value="asistente">asistente</option>
        </select>

        {error && <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>}

        <button
          type="submit"
          className="btn btn-primary rounded-3xl bg-csf-verde w-full justify-center text-white"
          disabled={loading}
        >
          {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-right-to-bracket"></i>}
           <span> {loading ? 'Ingresando…' : 'Ingresar'}</span>
        </button>
      </form>
    </div>
  )
}
