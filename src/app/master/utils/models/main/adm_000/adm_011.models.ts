export interface Adm011 {
  id_Modulo: number;
  nombre_modulo: string;
  id_documento: string;
  descripcion: string;
  sigla: string;
  componente: string;
  estado: boolean;
}

export interface Adm011Select {
  id_documento: number;
  descripcion: string;
}
