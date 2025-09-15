import React from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'


const LoginApp       = React.lazy(() => import('login/LoginApp'))
const HomeRoutes     = React.lazy(() => import('home/HomeRoutes'))
const AtencionRoutes = React.lazy(() => import('atencion/AtencionRoutes'))

function RequireAuth() {
  const loc = useLocation()
  const raw = localStorage.getItem('jwt') || ''
  const jwt = raw.replace(/^"+|"+$/g, '').trim()
  if (!jwt) return <Navigate to="/login" replace state={{ from: loc }} />
  return <Outlet />
}

function RedirectRoot() {
  const raw = localStorage.getItem('jwt') || ''
  const jwt = raw.replace(/^"+|"+$/g, '').trim()
  return <Navigate to={jwt ? "/home" : "/login"} replace />
}

export default function AppRouter() {
  return (
    <React.Suspense fallback={<div className="p-6">Cargando…</div>}>
      <Routes>
        <Route index element={<RedirectRoot />} />
        <Route path="/login" element={<LoginApp />} />

        <Route element={<RequireAuth />}>
          <Route path="/home/*" element={<HomeRoutes />} />
          <Route path="/atencion/*" element={<AtencionRoutes />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  )
}
