import React, { useEffect, useMemo, useState } from 'react';
import { fetchPaciente, type PacienteDTO } from './api';
import cssHref from './index.css?url';
import { ensureStyle } from './style-loader';

type Props = {
  nroDocumento: string; 
  initial?: Partial<PacienteDTO>;
};



export default function App({ nroDocumento, initial }: Props) {


function fullName(p?: PacienteDTO) {
  const s = [p?.nombres, p?.apePaterno, p?.apeMaterno].filter(Boolean).join(' ').trim();
  return s || '—';
}

function calcEdad(fecha?: string) {
  if (!fecha) return '—';
  const d = new Date(fecha);
  if (isNaN(d.getTime())) return '—';
  const now = new Date();
  let edad = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) edad--;
  return `${edad} años`;
}

function hasAlergia(x: PacienteDTO | undefined) {
  const v = x?.alergias;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'string') return v.trim().length > 0;
  return false;
}


ensureStyle(new URL(cssHref, import.meta.url).toString());

  const [data, setData] = useState<PacienteDTO | undefined>(initial as PacienteDTO);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // modal

  useEffect(() => {
    let alive = true;
    setLoading(true); setErr(null);
    fetchPaciente(nroDocumento)
      .then(d => { if (alive) setData(d); })
      .catch(e => { if (alive) setErr(e?.message ?? 'Error al obtener datos del paciente'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [nroDocumento]);

  const nombre = useMemo(() => fullName(data), [data]);
  const edad = useMemo(() => calcEdad(data?.nacFecha), [data]);
  const alergia = useMemo(() => hasAlergia(data), [data]);

  return (
    <>
      
      <section className="bg-white/95 rounded-xl border shadow px-4 py-3 flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold leading-6">{nombre}</h2>
          <div className="text-sm opacity-80">
            {data?.tipoDocumento ?? 'DNI'} {data?.nroDocumento ?? nroDocumento} · {edad}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
        
            <span className="badge badge-info">Presencial</span>
            <span className="badge badge-success">Cita confirmada</span>
            {alergia && <span className="badge badge-error">PRESENTA ALERGIA</span>}
          </div>
          {err && <div className="text-error text-sm pt-1">⚠ {err}</div>}
        </div>

        <div className="pl-2">
          
          <button
            aria-label="Ampliar datos del paciente"
            className="btn btn-sm btn-outline"
            onClick={() => setOpen(true)}
            title="Ver todos los datos"
          >
            <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
          </button>
        </div>
      </section>

      
      {open && (
        <dialog className="modal modal-open" onClose={() => setOpen(false)}>
          <div className="modal-box max-w-5xl">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">Datos del paciente</h3>
              <button className="btn btn-sm btn-ghost" onClick={() => setOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {loading && <div className="py-6"><progress className="progress w-full" /></div>}

            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 text-sm">
                <LabelValue label="Nombres" value={data?.nombres} />
                <LabelValue label="Apellidos" value={[data?.apePaterno, data?.apeMaterno].filter(Boolean).join(' ')} />
                <LabelValue label="Edad" value={edad} />
                <LabelValue label="Fecha de Nacimiento" value={fmtDate(data?.nacFecha)} />
                <LabelValue label="Alergias" value={alergia ? 'PRESENTA ALERGIA' : 'Sin alergias registradas.'}
                            badgeClass={alergia ? 'badge-error' : undefined} />
                <LabelValue label="Tipo de Documento" value={data?.tipoDocumento ?? 'DNI'} />
                <LabelValue label="N° de documento" value={data?.nroDocumento ?? nroDocumento} />
                <LabelValue label="Género" value={data?.sexo} />
                <LabelValue label="Cod de atención" value={data?.codAtencion} />
                <LabelValue label="Número de Historia" value={data?.numHistoria} />
                <LabelValue label="Grupo sanguíneo" value={data?.grupoSanguineo} />
                <LabelValue label="Aseguradora" value={data?.Aseguradora} badgeClass="badge-primary" />
                <LabelValue label="Producto" value={data?.producto} />
                <LabelValue label="Teléfono celular" value={data?.telefono} />
                <LabelValue label="Email" value={data?.correo} />
                <LabelValue label="Dirección" value={data?.direccion} className="md:col-span-2 lg:col-span-3" />
              </div>
            )}

            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>Cerrar</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}

function LabelValue({
  label, value, className, badgeClass
}: { label: string; value?: React.ReactNode; className?: string; badgeClass?: string }) {
  const has = value !== undefined && value !== null && String(value).trim() !== '';
  return (
    <div className={className}>
      <div className="text-base-content/70">{label}</div>
      <div className="font-medium">
        {badgeClass && has ? <span className={`badge ${badgeClass}`}>{value}</span> : (has ? value : '—')}
      </div>
    </div>
  );
}

function fmtDate(s?: string) {
  if (!s) return '—';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString();
}
