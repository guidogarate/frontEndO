export interface Adm013 {
  id_modulo: number;
  id_tipotran: string;
  descripcion: string;
  sigla: string;
  id_clase_documento: number;
  id_codigo_transaccion: number;
  id_moneda: number;
  cantidad_lineas: number;
  comprobante_estandar: number;
  duplicado: boolean;
  id_rol: number;
  documento_preliminar: number;
  id_formato_impresion: number;
  estado: boolean;
}
export interface Adm013SelectModulos {
  id_modulo: number;
  modulo: string;
}
export interface Adm013SelectClaseDoc {
  id_clase_documento: number;
  descripcion: string;
}
export interface Adm013SelectCodTran {
  id_codigo_transaccion: number;
  descripcion: string;
}
export interface Adm013SelectDocPreliminar {
  documento_preliminar: number;
  descripcion: string;
}
export interface Adm013SelectDocStandar {
  comprobante_estandar: number;
  descripcion: string;
}
export interface Adm013SelectMonedas {
  id_moneda: number;
  descripcion: string;
}
export interface Adm013SelectDependencia {
  id_codigo_Dep: number;
  descripcion: string;
}
export interface Adm013SelectFormatoImpr {
  id_formato_impresion: number;
  descripcion: string;
}
