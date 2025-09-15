
import { Routes, Route } from 'react-router-dom'
import App from './App'



export default function HomeRoutes() {
  function HomeDetalle() {
  return <div className="p-6">Detalle de algo dentro de Home (placeholder)</div>
}

  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="detalle/:id" element={<HomeDetalle />} />
    </Routes>
  )
}
