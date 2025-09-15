import api from './apiClient';


export async function fetchListadoAtenciones(): Promise<any[]> {
  const { data } = await api.get('/TestFrontEnd/listadoAtenciones');
  return Array.isArray(data) ? data : [];
}


export async function fetchDniByCodAtencion(codAtencion: string): Promise<string | null> {
  const listado = await fetchListadoAtenciones();
  const row = listado.find((r) => String(r?.codAtencion) === String(codAtencion));
  return row?.nroDocumento ?? null;
}
