export interface Adm012 {
  id_modulo: number;
  nombre_modulo: string;
  id_formato: number;
  descripcion: string;
  sigla: string;
  tamaño_impresion: string;
  moneda: string;
  codigo_cuenta: string;
  numero_copias: string;
  codigo_qr: string;
  logo_empresa: string;
  estado: boolean;
}
export interface Adm012SelectModulos {
  id_modulo: number;
  modulo: string;
}
export interface Adm012SelectRegistros {
  id_registro: number;
  cantidad: string;
}
export interface Adm012SelectTamImp {
  id_tamano: number;
  descripcion: string;
}
export interface Adm012SelectMonedas {
  id_moneda: number;
  descripcion: string;
}
export interface Adm012SelectCodigoCuentas {
  id_codigocuenta: number;
  descripcion: string;
}
