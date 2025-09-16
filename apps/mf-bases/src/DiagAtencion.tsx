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
    <div className="rounded-xl bg-base-100 shadow-sm py-4">
      {/* Tabs superiores */}
      <div className="w-full border-b rounded-t-2xl bg-base-100">
        <div className="tabs tabs-lifted grid grid-cols-2 grid-rows-1  ">
          <button
            className={`tab tb--p border-tl  ${tab === 'nuevo' ? 'tab-active tb--p-active font-semibold text-base-content' : ''}`}
            onClick={() => setTab('nuevo')}
          >
            REGISTRAR NUEVO DIAGNÓSTICO
          </button>
          <button
            className={`tab tb--p border-tr ${tab === 'favoritos' ? 'tab-active tb--p-active font-semibold text-base-content' : ''}`}
            onClick={() => setTab('favoritos')}
          >
            MIS FAVORITOS
          </button>
        </div>
      </div>

      {/* Contenido de cada tab */}
      {tab === 'nuevo' ? (
        <div className="p-8 space-y-4">

          <div className="flex items-center gap-2">
            <i className="fa-regular fa-square-plus text-csf-verde text-lg" />
            <h3 className="text-xl font-semibold text-csf-azul ">Búsqueda de diagnóstico</h3>
          </div>

   
        <div className="w-[calc(100%-30%)] flex my-7">
          <input className="input outline-none focus:outline-none w-full rounded-4xl border-gray-100 bg-gray-100 " placeholder="Buscar paciente (nombre, apellido)" value="" />
          <button className="btn bg-csf-verde rounded-4xl relative right-12 z-20 hover:bg-csf-azul"><i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
          <div className="flex gap-3 justify-center items-center">
            <input type="checkbox" name='search' /><label htmlFor="search" className="text-sm whitespace-nowrap ">Por rango de fecha</label></div>
          
          </div>

      
          <div className="text-sm">
            <span className="font-semibold text-csf-azul">Diagnóstico seleccionado:</span>
          </div>

          {/* Tabla principal */}
          <div className="overflow-x-auto rounded-sm ">
            <table className="table table-sm border rounded-xl border-gray-200">
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

            
              </tbody>
            </table>
          </div>
        </div>
      ) : (
      
        <div className="p-5">
          <div className="text-sm opacity-70">No hay favoritos aún.</div>
        </div>
      )}
    </div>
  );
}
