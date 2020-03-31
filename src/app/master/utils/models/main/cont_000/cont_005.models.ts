export interface Cont005 {
  id_modulo: number;
  id_tipocomprobante: number;
  descripcion: string;
  sigla: string;
  estado: boolean;
}

export interface Cont005Mod {
  id_modulo: number;
  id_tipocomprobante: number;
  descripcion: string;
  sigla: string;
  estado: boolean;
  tipo_transaccion: number;
  formato_impresion: number;
}

export interface Cont005Sel {
  id_modulo: number;
  modulo: string;
}

export interface Cont005Trans {
  indice: number;
  id_modulo: number;
  id_tipo_transaccion: number;
  descripcion: string;
}

export interface Cont005Impre {
  indice: number;
  id_modulo: number;
  id_formato: number;
  descripcion: string;
}

export interface Cont005Up {
  descripcion: string;
  sigla: string;
  estado: boolean;
  tipo_transaccion: number;
  formato_impresion: number;
}
