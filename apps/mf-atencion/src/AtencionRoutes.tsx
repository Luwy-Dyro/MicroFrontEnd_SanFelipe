import { Routes, Route } from 'react-router-dom'
import AtencionApp from './App'

function Placeholder() {
  return <div className="p-6">Selecciona una atención…</div>
}

export default function AtencionRoutes() {
  return (
    <Routes>

      <Route index element={<Placeholder />} />

      <Route path=":codAtencion" element={<AtencionApp />} />
    </Routes>
  )
}
