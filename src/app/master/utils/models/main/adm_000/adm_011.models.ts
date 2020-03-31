export interface Adm011 {
  id_modulo: number;
  nombre_modulo: string;
  id_documento: string;
  descripcion: string;
  sigla: string;
  componente: string;
  estado: boolean;
}

export interface Adm011Select {
  id_modulo: number;
  modulo: string;
}
