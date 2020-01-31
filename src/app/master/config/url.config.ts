// "http://localhost:5000/"
// "https://sage-back.herokuapp.com/"
const url = {
  prod: "https://sage-back.herokuapp.com/",
  database: "sys_000/sys_001/database",
  ingresar: "sys_000/sys_001/ingresar",
  principal: "/#/bienvenido", // pantalla inicio
  // principal: "/#/md/90/adm_003", // pantalla inicio
  cerrarSesion: "sys_000/sys_001/salir",
  regContra: "sys_000/sys_001/registrar-contra",
  salir: "/#/login",
  validarUser: "sys_000/sys_001/validar-user",
  cargarMenu: "sys_000/sys_002/cargar-menu",
  cargarFto: "sys_000/sys_002/cargar-favoritos",
  cargaMenuFavor: "sys_000/sys_002/cargar-menu-favor",
  eliminarFto: "sys_000/sys_002/eliminar-favoritos",
  agregarFto: "sys_000/sys_002/agregar-favoritos",
  fotoDefecto:
    "https://cdn0.iconfinder.com/data/icons/business-4-4/97/197-512.png"
};

export default url;
