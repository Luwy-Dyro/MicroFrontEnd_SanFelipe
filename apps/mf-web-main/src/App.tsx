
import  { useEffect, useMemo, useState } from 'react'
import cssHref from './index.css?url'
import { useInRouterContext, useNavigate } from 'react-router-dom'
import { ensureStyle } from './style-loader'
import { fetchListadoAtenciones } from './api'
import React from 'react'

export default function MainApp() {

ensureStyle(new URL(cssHref, import.meta.url).toString())

type Row = Record<string, any>


const navigate = useNavigate()


function calcEdadY(text?: string) {
  if (!text) return '-'
  const d = new Date(text)
  if (isNaN(d.getTime())) return '-'
  const now = new Date()
  let edad = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) edad--
  return `${edad} años`
}

function joinNombre(nombres?: string, apePat?: string, apeMat?: string) {
  const s = [nombres, apePat, apeMat].filter(Boolean).join(' ').trim()
  return s || '-'
}

type RowIn = Record<string, any>
type RowOut = {
  atencion: string; dni: string; nombres: string; edad: string;
  fechaCita: string; horaCita: string; horaLlegada: string;
  tipoAtencion: string; estado: string;
}

function mapRow(r: RowIn): RowOut {
  return {
    atencion: r.codAtencion ?? '-',
    dni: r.nroDocumento ?? '-',
    nombres: joinNombre(r.nombres, r.apePaterno, r.apeMaterno),
    edad: calcEdadY(r.nacFecha),
    fechaCita: r.fechaCita ?? '-',
    horaCita: r.horaCita ?? '-',
    horaLlegada: r.horaLlegada ?? '-',
    tipoAtencion: r.tipoAtencion ?? '-',
    estado: r.estadoAtencion ?? '-',
  }
}


function badgeClaseTipo(tipo: string) {
  const t = tipo.toLowerCase()
  if (t.includes('presencial')) return 'badge badge-success'
  if (t.includes('virtual')) return 'badge badge-info'
  if (t.includes('proced')) return 'badge badge-warning'
  return 'badge badge-ghost'
}
function labelEstado(x: string) {
  const k = (x || '').toUpperCase()
  if (k === 'A') return 'Atendidos'
  if (k === 'EE') return 'En espera'
  if (k === 'R') return 'Reservado'
  if (k === 'EA') return 'En Atención'
  if (k === 'N') return 'No llegó'
  return x || '-'
}
function badgeClaseEstado(x: string) {
  const lbl = labelEstado(x).toLowerCase()
  if (lbl.includes('atendido') ) return 'badge badge-success'
  if (lbl.includes('espera')) return 'badge badge-warning'
  if (lbl.includes('reservado')) return 'badge badge-info'
  if (lbl.includes('en atención') ) return 'badge badge-accent'
  if (lbl.includes('no llegó') ) return 'badge badge-error'
  return 'badge badge-ghost'
}




  const inRouter = useInRouterContext()
  if (!inRouter) {
    console.warn('[mf-web-menu] NO está bajo el BrowserRouter del Shell')
  }
  console.log('[mf-web-menu] MAINNN React version:', React.version)



  const [all, setAll] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [q, setQ] = useState('')
  const [tab, setTab] = useState<'SJM' | 'CAM' | 'MOL'>('SJM')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    setLoading(true); setError(null)
    fetchListadoAtenciones()
      .then(setAll)
      .catch((e) => setError(e?.message ?? 'Error al cargar listado'))
      .finally(() => setLoading(false))
  }, [])

  
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    const arr = s
      ? all.filter(r => JSON.stringify(r).toLowerCase().includes(s))
      : all

    return arr
  }, [q, all, tab])

  const mapped = useMemo(() => filtered.map(mapRow), [filtered])

  
  const total = mapped.length
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const pageClamped = Math.min(page, pages)
  const start = (pageClamped - 1) * pageSize
  const rows = mapped.slice(start, start + pageSize)

  return (
    <div className="p-6 space-y-4">
    
      <div className="join">
        <input
          className="input input-bordered join-item w-80"
          placeholder="Buscar paciente (nombre, apellido)"
          value={q}
          onChange={e => { setQ(e.target.value); setPage(1) }}
        />
        <button className="btn bg-csf-verde join-item">
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
      </div>

 
      <div role="tablist" className="tabs tabs-bordered">
        <a role="tab" className={`tab ${tab==='SJM'?'tab-active':''}`} onClick={()=>setTab('SJM')}>SEDE JESÚS MARÍA</a>
        <a role="tab" className={`tab ${tab==='CAM'?'tab-active':''}`} onClick={()=>setTab('CAM')}>SEDE CAMACHO</a>
        <a role="tab" className={`tab ${tab==='MOL'?'tab-active':''}`} onClick={()=>setTab('MOL')}>SEDE LA MOLINA</a>
      </div>

     
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="badge badge-info">Reservados</span>
        <span className="badge badge-warning">En espera</span>
        <span className="badge badge-accent">En atención</span>
        <span className="badge badge-success">Atendidos</span>
        <span className="badge badge-error">No llegó</span>
      </div>

      <div className="bg-base-100 rounded-box shadow p-2">

        <div className="flex items-center justify-between px-2 py-2">
          <div className="text-sm opacity-70">
            {loading ? 'Cargando…' : `Mostrando ${rows.length} de ${total}`}
            {error && <span className="text-error ml-2">Error al listar· {error}</span>}
          </div>
          <div className="flex items-center gap-2">
            <div className="join">
              <button className="btn btn-sm join-item" disabled={pageClamped<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>«</button>
              <button className="btn btn-sm join-item" disabled>{pageClamped}</button>
              <button className="btn btn-sm join-item" disabled={pageClamped>=pages} onClick={()=>setPage(p=>Math.min(pages,p+1))}>»</button>
            </div>
            <select className="select select-sm w-24"
              value={pageSize}
              onChange={e=>{ setPageSize(Number(e.target.value)); setPage(1) }}>
              {[10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>


        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Atención</th>
                <th>DNI / CE</th>
                <th>Nombres y Apellidos</th>
                <th>Edad</th>
                <th>Fecha cita</th>
                <th>Hora cita</th>
                <th>Hora de llegada</th>
                <th>Tipo de atención</th>
                <th>Estado</th>
                <th>Historial</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={10}><progress className="progress w-full" /></td></tr>
              )}
              {!loading && rows.map((e, i) => (
                <tr key={i} onClick={() =>  navigate(`/atencion/${e.atencion}?dni=${e.dni}&tipo=${encodeURIComponent(e.tipoAtencion)}`,
           { state: { dni: e.dni, tipoAtencion: e.tipoAtencion } })} className='cursor-pointer'>
                  <td>{e.atencion}</td>
                  <td>{e.dni}</td>
                  <td>{e.nombres}</td>
                  <td>{e.edad}</td>
                  <td>{e.fechaCita}</td>
                  <td>{e.horaCita}</td>
                  <td>{e.horaLlegada}</td>
                  <td><span className={badgeClaseTipo(e.tipoAtencion)}>{e.tipoAtencion}</span></td>
                  <td><span className={"text-xs! whitespace-nowrap " + badgeClaseEstado(e.estado)}>{labelEstado(e.estado)}</span></td>
                  <td>
                    <button className="btn btn-ghost btn-xs"
                    onClick={() =>  navigate(`/atencion/${e.atencion}?dni=${e.dni}&tipo=${encodeURIComponent(e.tipoAtencion)}`,
           { state: { dni: e.dni, tipoAtencion: e.tipoAtencion } })}
                    >
                      <i className="fa-solid fa-clock-rotate-left"></i> Mostrar
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 && (
                <tr><td colSpan={10} className="text-center text-sm text-base-content/60 py-6">Sin resultados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
