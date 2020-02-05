export interface Adm006 {
  login: string;
  descripcion: string;
  activo: boolean;
  grupo_acceso: string;
  grupo_perfil: string;
  tipo_usuario: string;
  codigo_persona: string;
  nombre_persona: string;
  foto: string;
  cantidad: number;
  tipos_usuario: Adm006Obj[];
}

export interface Adm006Obj {
  id_grupos_perfil: number;
  descripcion: string;
}
