export interface Adm011 {
  codigo: string;
  descripcion: string;
  sigla: string;
  estado: boolean;
  dependencia: string;
  tipo_territorio: number;
  territorio: number;
}

export interface Adm012 {
  idDocumento: number;
  estado: boolean;
  descripcion: string;
  descripcion_corta: string;
  nombreComponente: string;
  sigla: string;
}
