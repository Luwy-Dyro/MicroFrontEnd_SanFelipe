import api from './apiClient';

export type Seccion = { id?: number | string; nombre: string };

// Adapta tanto respuesta en OBJETO (con subgrupos) como en ARRAY
export async function fetchOpcionesPorAtencion(tipoAtencion: string): Promise<Seccion[]> {
  const { data } = await api.get('/TestFrontEnd/opcionesXAtencion', {
    params: { tipoAtencion },
  });

  // Caso 1: tu API actual (objeto con subgrupos)
  if (data && Array.isArray(data.subgrupos)) {
    return data.subgrupos.map((s: any) => ({
      id: s?.id ?? s?.idOpcion ?? undefined,
      nombre: s?.nombre ?? String(s ?? ''),
    }));
  }

  // Caso 2: ya viene como array (por si cambia en el futuro)
  if (Array.isArray(data)) {
    return data.map((x: any) => {
      if (typeof x === 'string') return { nombre: x };
      return { id: x?.id ?? x?.idOpcion, nombre: x?.nombre ?? String(x ?? '') };
    });
  }

  // Fallback
  return [];
}
