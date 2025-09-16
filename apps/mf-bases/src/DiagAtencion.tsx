import { useState } from 'react';

type Props = {
  tipoAtencion: string; 
};

export default function DiagAtencion({ tipoAtencion }: Props) {
  const [tab, setTab] = useState<'nuevo' | 'favoritos'>('nuevo');
  const [q, setQ] = useState('');
  const [fav, setFav] = useState(false);
  const [prd, setPrd] = useState<'P' | 'R' | 'D' | ''>('');
  const [obs, setObs] = useState('');

  return (
    <div className="rounded-2xl border bg-base-100 shadow-sm">
      {/* Tabs superiores */}
      <div className="w-full border-b rounded-t-2xl bg-base-100">
        <div className="tabs tabs-lifted px-2">
          <button
            className={`tab ${tab === 'nuevo' ? 'tab-active font-semibold text-base-content' : ''}`}
            onClick={() => setTab('nuevo')}
          >
            REGISTRAR NUEVO DIAGNÓSTICO
          </button>
          <button
            className={`tab ${tab === 'favoritos' ? 'tab-active font-semibold text-base-content' : ''}`}
            onClick={() => setTab('favoritos')}
          >
            MIS FAVORITOS
          </button>
        </div>
      </div>

      {/* Contenido de cada tab */}
      {tab === 'nuevo' ? (
        <div className="p-5 space-y-4">
          {/* Título búsqueda */}
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-square-plus text-success text-lg" />
            <h3 className="text-lg font-semibold">Búsqueda de diagnóstico</h3>
          </div>

          {/* Buscador CIE-10 */}
          <div className="flex items-center">
            <div className="join w-full max-w-3xl">
              <div className="join-item input input-bordered flex-1 flex items-center gap-2">
                <i className="fa-solid fa-magnifying-glass opacity-60" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar por descripción o código CIE-10"
                  className="grow outline-none bg-transparent"
                />
              </div>
              <button className="join-item btn btn-success">
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </div>
          </div>

          {/* Subtítulo */}
          <div className="text-sm">
            <span className="font-semibold text-primary">Diagnóstico seleccionado:</span>
          </div>

          {/* Tabla principal */}
          <div className="overflow-x-auto rounded-xl border">
            <table className="table table-sm">
              <thead className="bg-base-200">
                <tr>
                  <th className="w-16">Fav</th>
                  <th className="w-28">CIE-10</th>
                  <th>Diagnóstico</th>
                  <th className="w-10 text-center">P</th>
                  <th className="w-10 text-center">R</th>
                  <th className="w-10 text-center">D</th>
                  <th className="min-w-64">Especificación</th>
                  <th className="w-16 text-center">Añadir</th>
                  <th className="w-16 text-center">Quitar</th>
                </tr>
              </thead>
              <tbody>
                {/* Fila editable base (placeholder) */}
                <tr>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => setFav((f) => !f)}
                      aria-label="Favorito"
                    >
                      {fav ? (
                        <i className="fa-solid fa-star text-warning" />
                      ) : (
                        <i className="fa-regular fa-star" />
                      )}
                    </button>
                  </td>
                  <td className="text-base-content/70">-</td>
                  <td className="text-base-content/70">-</td>

                  {/* Radio P/R/D */}
                  <td className="text-center">
                    <input
                      type="radio"
                      name="prd"
                      className="radio radio-sm"
                      checked={prd === 'P'}
                      onChange={() => setPrd('P')}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="radio"
                      name="prd"
                      className="radio radio-sm"
                      checked={prd === 'R'}
                      onChange={() => setPrd('R')}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="radio"
                      name="prd"
                      className="radio radio-sm"
                      checked={prd === 'D'}
                      onChange={() => setPrd('D')}
                    />
                  </td>

                  <td>
                    <input
                      value={obs}
                      onChange={(e) => setObs(e.target.value)}
                      className="input input-bordered input-sm w-full"
                      placeholder="Observación (opcional)"
                    />
                  </td>

                  <td className="text-center">
                    <button className="btn btn-ghost btn-xs">
                      <i className="fa-regular fa-circle-check" />
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-ghost btn-xs">
                      <i className="fa-regular fa-trash-can" />
                    </button>
                  </td>
                </tr>

                {/* Si quieres, aquí irían más filas con resultados de búsqueda */}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Tab MIS FAVORITOS */
        <div className="p-5">
          <div className="text-sm opacity-70">No hay favoritos aún.</div>
        </div>
      )}
    </div>
  );
}
