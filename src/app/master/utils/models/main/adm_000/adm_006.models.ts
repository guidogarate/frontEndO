export interface Adm006 {
  login: string;
  descripcion: string;
  activo: boolean;
  grupo_acceso: string;
  id_grupo_acceso: string;
  grupo_perfil: string;
  id_grupo_perfil: number;
  id_estado: number;
  tipo_usuario: string;
  id_tipo_usuario: string;
  codigo_persona: string;
  nombre_persona: string;
  foto: string;
  cantidad: number;
  tipos_usuario: Adm006Obj[];
  grupos_acceso: Adm006Obj[];
  grupos_perfil: Adm006Obj[];
  personas: Adm006Obj[];
  estado: Adm006Obj[];
}

export interface Adm006Obj {
  id_grupos_perfil: number;
  descripcion: string;
}
