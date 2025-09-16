import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import cssHref from './index.css?url';
import { ensureStyle } from './style-loader';
import { fetchDniByCodAtencion } from './api'; 

ensureStyle(new URL(cssHref, import.meta.url).toString());

const HeaderApp = React.lazy(() => import('header/HeaderApp'));
const MenuApp   = React.lazy(() => import('menu/MenuApp'));
const FooterApp = React.lazy(() => import('footer/FooterApp'));
const DatosApp  = React.lazy(() => import('datospaciente/DatosPacienteApp'));
const BasesApp  = React.lazy(() => import('bases/BasesApp'));

export default function AtencionApp() {
  const { codAtencion = '' } = useParams<{ codAtencion: string }>();
  const [sp, setSp] = useSearchParams();
  const loc = useLocation() as { state?: { dni?: string; tipoAtencion?: string } };
  const tipoAtencion =  sp.get('tipo') ?? loc.state?.tipoAtencion ?? 'Ambulatorio'; 


  const [dniResolved, setDniResolved] = useState<string | null>(null);

  const dniFromQuery = sp.get('dni') || undefined;
  const dniFromState = loc.state?.dni || undefined;
  const dniFromParamIfLooksLikeDni =
    /^\d{8}$/.test(codAtencion) ? codAtencion : undefined;


  const dni = useMemo(
    () => dniFromQuery ?? dniFromState ?? dniFromParamIfLooksLikeDni ?? dniResolved ?? '',
    [dniFromQuery, dniFromState, dniFromParamIfLooksLikeDni, dniResolved]
  );

  useEffect(() => {

    if (!dni && codAtencion && !dniFromParamIfLooksLikeDni) {
      fetchDniByCodAtencion(codAtencion)
        .then((dniX) => {
          if (dniX) {
            setDniResolved(dniX);
            
            setSp((prev) => { prev.set('dni', dniX); return prev; }, { replace: true });
          }
        })
        .catch(() => {/* opcional: toast */});
    }
  }, [dni, codAtencion, dniFromParamIfLooksLikeDni, setSp]);

  return (
    <React.Suspense fallback={<div className="p-6">Cargando Atención…</div>}>
      <div className="min-h-dvh bg-base-200 p-4">
        <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[280px_1fr] gap-4 min-h-[calc(100dvh-2rem)]">
          <section className="row-start-1 col-span-2 bg-base-100 border rounded-box shadow">
            <HeaderApp />
          </section>

          <section className="row-start-2 col-start-1 bg-base-100  rounded-box shadow overflow-auto">
            <MenuApp />
          </section>

          <section className="row-start-2 col-start-2 flex flex-col gap-4">
          
              <Suspense fallback={<div className="p-6">Cargando datos del paciente…</div>}>
                {dni
                  ? <DatosApp nroDocumento={dni} />
                  : <div className="p-6 text-sm opacity-70">Resolviendo DNI…</div>}
              </Suspense>
      
            <div className="flex-1 bg-base-100 border rounded-box shadow overflow-auto">
              <BasesApp tipoAtencion={tipoAtencion}/>
            </div>

            <footer className="bg-white/95 rounded-xl border shadow p-4">
              <FooterApp />
            </footer>
          </section>
        </div>
      </div>
    </React.Suspense>
  );
}
