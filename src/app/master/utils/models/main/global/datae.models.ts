export interface DataEmpresa {
  logo_empresa: string;
  razon_social: string;
  sigla: string;
  actividad_empresarial: string;
  gestiones: Gestion[];
}

export interface Gestion {
  gestion: number;
}
