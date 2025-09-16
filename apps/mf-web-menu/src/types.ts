export type Subgrupo = {
  id: number;
  nombre: string;       
  ruta: string;         
};

export type PerfilResponse = {
  idPerfil: string;
  grupoPerfil: string;  
  subgrupos: Subgrupo[];
};