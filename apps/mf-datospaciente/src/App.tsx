import React, { useEffect, useMemo, useState } from "react";
import {
  fetchPaciente,
  fetchAlergias,
  fetchPrincipiosActivos,
  type PacienteDTO,
  type AlergiasDTO,
  type PrincipioActivo,
} from "./api";
import cssHref from "./index.css?url";
import { ensureStyle } from "./style-loader";

type Props = { nroDocumento: string; initial?: Partial<PacienteDTO> };

export default function App({ nroDocumento, initial }: Props) {
  ensureStyle(new URL(cssHref, import.meta.url).toString());

  const [data, setData] = useState<PacienteDTO | undefined>(
    initial as PacienteDTO
  );
  const [alergias, setAlergias] = useState<AlergiasDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  const [showAlergias, setShowAlergias] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);
    (async () => {
      try {
        const [pac, ale] = await Promise.all([
          fetchPaciente(nroDocumento),
          fetchAlergias(nroDocumento),
        ]);
        if (!alive) return;
        setData(pac);
        setAlergias(ale ?? null);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "Error al obtener datos del paciente");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [nroDocumento]);

  // helpers
  const nombre = useMemo(() => {
    const s = [data?.nombres, data?.apePaterno, data?.apeMaterno]
      .filter(Boolean)
      .join(" ")
      .trim();
    return s || "—";
  }, [data]);
  const edad = useMemo(() => {
    const f = data?.nacFecha;
    if (!f) return "—";
    const d = new Date(f);
    if (isNaN(d.getTime())) return "—";
    const now = new Date();
    let e = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) e--;
    return `${e} años`;
  }, [data?.nacFecha]);

  const tieneAlergia = useMemo(() => {
    const a = alergias;
    if (!a) return false;
    if (a.declaratoria) return true;
    if (Array.isArray(a.principios) && a.principios.length > 0) return true;
    if (a.alimentos && a.alimentos.trim().length > 0) return true;
    if (a.otros && a.otros.trim().length > 0) return true;
    return false;
  }, [alergias]);

  // const alergiasResumen = useMemo(() => {
  //   if (!alergias) return '';
  //   const parts: string[] = [];
  //   if (Array.isArray(alergias.principios) && alergias.principios.length > 0) {
  //     parts.push(...alergias.principios.map(p => p.descripcion));
  //   }
  //   if (alergias.alimentos) parts.push(`Alimentos: ${alergias.alimentos}`);
  //   if (alergias.otros) parts.push(`Otros: ${alergias.otros}`);
  //   return parts.join(' • ');
  // }, [alergias]);

  return (
    <section className="rounded-xl bg-white shadow-sm mb-6 ">
      <div className="relative px-4 py-3">
        <div className="flex items-center align-middle gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-csf-azul font-bold text-lg">
            <i className="fa-regular fa-user text-csf-verde text-lg" />
            <span>Datos del paciente</span>
          </div>

          <div className="text-base ">{nombre}</div>

          <div className="text-sm ml-5">
            <span className="text-csf-azul font-semibold">Edad:</span> {edad}
          </div>

          <div className="ml-auto mr-2">
            {tieneAlergia ? (
              <button
                className="badge badge-error hover:opacity-90 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAlergias(true);
                }}
                title="Ver/editar alergias"
              >
                PRESENTA ALERGIA
              </button>
            ) : (
              <span className="badge badge-info text-white">SIN ALERGIA</span>
            )}
          </div>
          <button
            type="button"
            aria-label="Desplegar"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="btn btn-circle bg-csf-azul border-0 btn-sm relative rounded-4xl"
          >
            <i
              className={`fa-solid text-white ${
                open ? "fa-chevron-up" : "fa-chevron-down"
              }`}
            />
          </button>
        </div>
      </div>

      <div className={open ? "block" : "hidden"}>
        {loading && (
          <div className="py-4 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-6 w-full" />
            ))}
          </div>
        )}

        {!loading && (
          <>
            {err && <div className="alert alert-error mx-4 mb-4">{err}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 text-sm px-5 py-6">
              <LabelValue label="Nombres" value={data?.nombres} />
              <LabelValue
                label="Apellidos"
                value={[data?.apePaterno, data?.apeMaterno]
                  .filter(Boolean)
                  .join(" ")}
              />
              <LabelValue label="Edad" value={edad} />
              <LabelValue
                label="Fecha de Nacimiento"
                value={fmtDate(data?.nacFecha)}
              />

              <LabelValue
                label="Tipo de Documento"
                value={data?.tipoDocumento ?? "DNI"}
              />
              <LabelValue
                label="N° de documento"
                value={data?.nroDocumento ?? nroDocumento}
              />
              <LabelValue label="Género" value={data?.sexo} />
              <LabelValue label="Cod de atención" value={data?.codAtencion} />
              <LabelValue
                label="Número de Historia"
                value={data?.numHistoria}
              />
              <LabelValue
                label="Grupo sanguíneo"
                value={data?.grupoSanguineo}
              />
              <LabelValue
                label="Aseguradora"
                value={data?.Aseguradora}
                badgeClass="badge-primary"
              />
              <LabelValue label="Producto" value={data?.producto} />
              <LabelValue label="Teléfono celular" value={data?.telefono} />
              <LabelValue label="Email" value={data?.correo} />
              <LabelValue label="Dirección" value={data?.direccion} />
            </div>
          </>
        )}
      </div>

      {/* Modal que ya implementaste */}
      {showAlergias && (
        <AlergiasModal
          initial={alergias}
          onClose={() => setShowAlergias(false)}
          onSave={(next) => {
            setAlergias(next);
            setShowAlergias(false);
          }}
        />
      )}
    </section>
  );
}

/* ========= Modal de Alergias ========= */
function AlergiasModal({
  initial,
  onClose,
  onSave,
}: {
  initial: AlergiasDTO | null;
  onClose: () => void;
  onSave: (next: AlergiasDTO) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [catalog, setCatalog] = useState<PrincipioActivo[]>([]);
  const [q, setQ] = useState("");
  const [decl, setDecl] = useState<boolean>(!!initial?.declaratoria);
  const [selected, setSelected] = useState<PrincipioActivo[]>(
    (initial?.principios as PrincipioActivo[]) ?? []
  );
  const [alimentos, setAlimentos] = useState(initial?.alimentos ?? "");
  const [otros, setOtros] = useState(initial?.otros ?? "");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchPrincipiosActivos()
      .then((list) => {
        if (alive) setCatalog(list);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    const notSelected = (p: PrincipioActivo) =>
      !selected.some((s) => s.id === p.id);
    return t
      ? catalog.filter(
          (p) => p.descripcion.toLowerCase().includes(t) && notSelected(p)
        )
      : catalog.filter(notSelected);
  }, [q, catalog, selected]);

  const addFirstMatch = () => {
    if (filtered[0]) {
      setSelected((prev) => [...prev, filtered[0]]);
      setQ("");
    }
  };
  const remove = (id: number) =>
    setSelected((prev) => prev.filter((p) => p.id !== id));

  const handleSave = () => {
    onSave({
      declaratoria: decl,
      principios: selected,
      alimentos: alimentos.trim(),
      otros: otros.trim(),
    });
  };

  return (
    <dialog className="modal modal-open" onClose={onClose}>
      <div className="modal-box max-w-5xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">Declaratoria de alergias</span>
            <label className="label cursor-pointer gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                checked={decl}
                onChange={(e) => setDecl(e.target.checked)}
              />
              <span>Si</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={!decl}
                onChange={(e) => setDecl(!e.target.checked)}
              />
              <span>No</span>
            </label>
          </div>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-6 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-2">
              <div>
                <div className="mb-2 font-medium">Principio activo</div>
                <div className="w-[calc(100%-30%)] flex my-7">
                  <input
                    className="input outline-none focus:outline-none w-full rounded-4xl border-gray-100 bg-gray-100 "
                    placeholder="Buscar por principio activo"
                    value=""
                  />
                  <button className="btn bg-csf-verde rounded-4xl relative right-12 z-20 hover:bg-csf-azul">
                    <i className="fa-solid fa-magnifying-glass text-white"></i>
                  </button>
                  <div className="flex gap-3 justify-center items-center">
                    <input type="checkbox" name="search" />
                    <label
                      htmlFor="search"
                      className="text-sm whitespace-nowrap "
                    >
                      Por rango de fecha
                    </label>
                  </div>
                </div>
                {/* Tabla seleccionados */}
                <div className="mt-6 rounded-xl overflow-hidden">
                  <table className="table table-sm">
                    <thead className="bg-base-200">
                      <tr>
                        <th>Nombre</th>
                        <th className="w-20 text-right">Quitar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.length === 0 ? (
                        <tr>
                          <td colSpan={2}>
                            <div className="p-4 text-sm opacity-70">
                              Sin elementos seleccionados.
                            </div>
                          </td>
                        </tr>
                      ) : (
                        selected.map((p) => (
                          <tr key={p.id}>
                            <td>{p.descripcion}</td>
                            <td className="text-right">
                              <button
                                className="btn btn-ghost btn-xs"
                                onClick={() => remove(p.id)}
                                title="Quitar"
                              >
                                <i className="fa-regular fa-trash-can" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Sugerencias rápidas (opcional) */}
                {q && filtered.length > 0 && (
                  <div className="text-xs opacity-70 mt-1">
                    Sugerencias:{" "}
                    {filtered
                      .slice(0, 3)
                      .map((p) => p.descripcion)
                      .join(" · ")}
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha: Alimentos/Otros */}
            <div className="space-y-4">
              <div>
                <div className="mb-2 font-medium">Alimentos</div>
                <textarea
                  value={alimentos}
                  onChange={(e) => setAlimentos(e.target.value)}
                  className="textarea textarea-bordered w-full min-h-32"
                  placeholder="Detalle de alimentos"
                />
              </div>
              <div>
                <div className="mb-2 font-medium">Otros</div>
                <textarea
                  value={otros}
                  onChange={(e) => setOtros(e.target.value)}
                  className="textarea textarea-bordered w-full min-h-32"
                  placeholder="Otros"
                />
              </div>
            </div>
          </div>
        )}

        <div className="modal-action">
          <button className="btn btn-success" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn" onClick={onClose}>
            Salir
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

/* ===== utilidades ===== */

function LabelValue({
  label,
  value,
  className,
  badgeClass,
}: {
  label: string;
  value?: React.ReactNode;
  className?: string;
  badgeClass?: string;
}) {
  const has =
    value !== undefined && value !== null && String(value).trim() !== "";
  return (
    <div className={className}>
      <div className="text-csf-azul ">{label}</div>
      <div className="font-medium">
        {badgeClass && has ? (
          <span className={`badge ${badgeClass}`}>{value}</span>
        ) : has ? (
          value
        ) : (
          "—"
        )}
      </div>
    </div>
  );
}
function fmtDate(s?: string) {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString();
}
