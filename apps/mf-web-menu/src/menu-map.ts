
import type { Subgrupo } from './types';


const ICONS: Record<string, string> = {
  'Ambulatorio': 'fa-solid fa-notes-medical',
  'Hospital': 'fa-solid fa-hospital',
  'Emergencia': 'fa-solid fa-truck-medical',
  'Auditoría Médica': 'fa-solid fa-file-medical',
  'Inicio': 'fa-solid fa-house',
  'Mi agenda': 'fa-solid fa-calendar-days',
  'Data Historica': 'fa-solid fa-clock-rotate-left',
  'Data Histórica': 'fa-solid fa-clock-rotate-left',
};


function routeFromBackend(ruta: string): string {
  
  if (/\/Container\/Inicio/i.test(ruta)) return '/home';
  
  if (/\/Container\/Ambulatorio/i.test(ruta)) return '/ambulatorio';
  if (/\/Container\/Hospital/i.test(ruta)) return '/hospital';
  if (/\/Container\/Emergencia/i.test(ruta)) return '/emergencia';
  if (/\/Container\/agenda/i.test(ruta)) return '/agenda';
  if (/\/Container\/dataHistorica/i.test(ruta)) return '/historica';
  
  return ruta.replace(/^\/Container/i, '').toLowerCase() || '/';
}

export function mapToMenuModel(subgrupos: Subgrupo[]) {
  
  const topNames = new Set(['Ambulatorio', 'Hospital', 'Emergencia', 'Auditoría Médica']);
  const top: Subgrupo[] = [];
  const bottom: Subgrupo[] = [];

  for (const s of subgrupos) (topNames.has(s.nombre) ? top : bottom).push(s);

  
  const order = ['Ambulatorio', 'Hospital', 'Emergencia', 'Auditoría Médica'];
  top.sort((a, b) => order.indexOf(a.nombre) - order.indexOf(b.nombre));

  
  const toItemProps = (s: Subgrupo) => ({
    key: s.id,
    icon: ICONS[s.nombre] ?? 'fa-solid fa-circle',
    text: s.nombre,
    to: routeFromBackend(s.ruta),
    state: { tipoAtencion: s.nombre },
  });

  return {
    topItems: top.map(toItemProps),
    bottomItems: bottom.map(toItemProps),
  };
}
