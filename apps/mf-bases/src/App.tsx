import { useEffect, useMemo, useState } from 'react';
import cssHref from './index.css?url';
import { ensureStyle } from './style-loader';
import { fetchOpcionesPorAtencion, type Seccion } from './api';

type Props = { tipoAtencion: string };

function iconFor(title: string) {
  const t = title.toLowerCase();
  if (t.includes('anamnesis') || t.includes('examen')) return 'fa-notes-medical';
  if (t.includes('diagn')) return 'fa-stethoscope';
  if (t.includes('trat')) return 'fa-syringe';
  if (t.includes('lab')) return 'fa-vial';
  if (t.includes('imagen')) return 'fa-x-ray';
  if (t.includes('resultado')) return 'fa-file-waveform';
  if (t.includes('interconsulta')) return 'fa-user-doctor';
  if (t.includes('proced')) return 'fa-briefcase-medical';
  if (t.includes('patolog')) return 'fa-microscope';
  return 'fa-folder-open';
}

export default function BasesApp({ tipoAtencion }: Props) {
  ensureStyle(new URL(cssHref, import.meta.url).toString());

  const [ops, setOps] = useState<Seccion[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    let alive = true;
    setLoading(true); setErr(null);
    fetchOpcionesPorAtencion((tipoAtencion || '').trim())
      .then(d => { if (alive) setOps(d); })
      .catch(e => { if (alive) setErr(e?.message ?? 'Error al cargar opciones'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [tipoAtencion]);

  const items = useMemo(() => ops.map(o => ({ title: o.nombre })), [ops]);

  if (!tipoAtencion) {
    return <div className="p-6 text-sm opacity-70">Sin tipo de atención seleccionado.</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-3 text-sm opacity-70">
        Servicio: <span className="font-medium">{tipoAtencion}</span>
      </div>

      {loading && (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-12 w-full" />)}
        </div>
      )}

      {err && <div className="alert alert-error">{err}</div>}

      {!loading && !err && items.length === 0 && (
        <div className="text-sm opacity-70">No hay opciones para este servicio.</div>
      )}

      <div className="space-y-2">
        {items.map((it, i) => {
          const opened = openIdx === i;
          return (
            <div key={i} className="collapse collapse-arrow bg-primary text-primary-content rounded-lg">
              <input
                type="checkbox"
                checked={opened}
                onChange={() => setOpenIdx(opened ? null : i)}
                aria-expanded={opened}
              />
              <div className="collapse-title text-base font-medium flex items-center gap-2">
                <i className={`fa-solid ${iconFor(it.title)} text-base`} />
                <span>{it.title}</span>
              </div>
              <div className="collapse-content bg-base-100 text-base-content rounded-b-lg">
                <div className="p-4 text-sm opacity-70">Sin registros.</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
