import api from './apiClient';

export async function fetchPaciente(nroDocumento: string): Promise<PacienteDTO> {
  const { data } = await api.get('/TestFrontEnd/datoPacientexAtencion', {
    params: { nroDocumento },
  });
  return data;
}

export async function fetchAlergias(nroDocumento: string): Promise<AlergiasDTO | null> {
  const { data } = await api.get('/TestFrontEnd/alergiasxDni', {
    params: { nroDocumento },
  });
  return data ?? null;
}


export async function fetchPrincipiosActivos(): Promise<PrincipioActivo[]> {
  const { data } = await api.get('/TestFrontEnd/principiosActivos');
  return Array.isArray(data) ? data : [];
}




export type PrincipioActivo = { id: number; descripcion: string };
export type AlergiasDTO = {
  declaratoria?: boolean;
  principios?: { id: number; descripcion: string }[];
  alimentos?: string;
  otros?: string;
};

export type PacienteDTO = {
  nombres?: string;
  apePaterno?: string;
  apeMaterno?: string;
  tipoDocumento?: string;
  nroDocumento?: string;
  nacFecha?: string; 
  sexo?: string;
  grupoSanguineo?: string;
  Aseguradora?: string;
  producto?: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  codAtencion?: string;
  numHistoria?: string;
  alergias?: string[] | string | null;
};