import api from './apiClient';

export async function fetchPaciente(nroDocumento: string): Promise<PacienteDTO> {
  const { data } = await api.get('/TestFrontEnd/datoPacientexAtencion', {
    params: { nroDocumento },
  });
  return data;
}


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