import { Component, OnInit } from '@angular/core';
import { Adm007Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
declare function initLabels ();

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-adm007',
  templateUrl: './adm007.component.html',
  styleUrls: ['./adm007.component.css']
})
export class Adm007Component implements OnInit {
  indiceContact : number = 0;
  indiceDirection : number = 0;
  editar : boolean = false;
  ocultarSeccion : boolean = false;
  ocultarSeccionContactos : boolean = false;
  ocultarSeccionDirecciones : boolean = false;
  lista : any ;
  ListActividadEmpresarial :  any;
  ListTipoDirecciones : any;
  idTipoDireccion : string ="1" ;
  ListDirecciones : any ;
  ListTipoContactos: any ;
  ListContactos : any;
  ListModulos : any;
  ListCiudades : any ;
  idCiudad : string ="0";
  textPais : string = "";
  textDepartamento : string = "";
  ListDepartamentos : any;
  ListPaises : any ;
  direcciones : any  = [];
  contactos : any = [];
  // nueva direccion a adicionar
  ListSend : any = {}; 
  newDirection : any = {
    "id_tipo_direccion": 1,
    "estado": true,
    "direccion": "",
    "id_direccion": 1,
    "tipo_direccion": "Propietario",
    "pais": "",
    "departamento": "",
    "ciudad": "",
    "id_ciudad":""
  };

  newContacto : any =   {
    "id_tipo_contacto": 0,
    "id_subtipo_contacto": 2,
    "id_contacto": "33-2",
    "codigo_contacto": "",
    "contacto": "",
    "estado": true,
    "tipo": "Fijo"
  };

  photoSelected: string | ArrayBuffer;
  file: File;

  constructor( private _adm007Service : Adm007Service,
              private _notyG: NotyGlobal) { 

  }

  ngOnInit() {
    this.ObtenerDatos();
    setTimeout(() => {
      initLabels();
    }, 1500);
  }

  ObtenerDatos(){
    this._adm007Service
    .ObtenerParametros()
    .subscribe(resp => {
      if (resp ["ok"]) {
        this.lista = resp["datos"];
        this.ListActividadEmpresarial = this.lista[0]["actividad_empresarial"];
        this.ListTipoDirecciones = this.lista[0]["tipo_direcciones"];
        this.ListDirecciones = this.lista[0]["direcciones"];
        if(this.ListDirecciones != null){
          this.CambiarTipoEstado();
        }
        this.ListContactos = this.lista[0]["contactos"];
        this.ListTipoContactos = this.lista[0]["tipo_contactos"];
        this.AgregarId();
        this.ListModulos = this.lista[0]["modulos"];
        this.ListPaises = this.lista[0]["paises"];
        this.ListDepartamentos = this.lista[0]["departamentos"];;
        this.ListCiudades = this.lista[0]["ciudades"];
        setTimeout(() => {
          initLabels();
        }, 800);
      }
      else {
        console.log("error: ", resp["mensaje"])
      }
    });
  }

  ActualizarDatos(){
    console.log("lista para guardar: ", this.ListSend);
    this._adm007Service
    .ActualizarDatos(this.ListSend)
    .subscribe(resp => {
      if(resp["ok"]){
        // console.log("datos actualizados component");
        this._notyG.noty("success", "datos actualizados", 3500);
      }
      else {
        this._notyG.noty("error", "no se pudo actualizar", 3500);
        console.log("error al guardar los datos");
        console.log(resp);
      }
    });
  }
  /* metodos auxiliares*/
  nada(){}
  PrepareSend(){
    this.ListDirecciones.forEach(element => {
      if(element.id_ciudad != undefined){
        this.direcciones.push(element);
      }
    });
  }

  Actualizar( seccion : string){
    this.PrepareSend();
    this.pasarDatosDireccion();
    switch(seccion){

      case 'all':
        // this.AgregarDireccion();
        // this.Agregar('contactos');
        // this.Agregar('direccion');
        // this.ActualizarDatos();
        this.ActualizarDatos1(this.file);
        this.ModoVista();
        console.log('entro por all');
        break;
      // case 'direccion' :
      //   this.Agregar(seccion);
      //   console.log('entro por direccion');
      //   break;
      // case 'contactos' :
      //   this.Agregar(seccion);
      //   console.log('entro por contactos');
      //   break;
    };
    // this.AgregarDireccion();
    //this.ActualizarDatos();
    //this.ModoVista();
  }
  ModoEdicion(){
    this.editar = true;
    this.LimpiarData();
  }
  ModoVista(){
    this.editar = false;
    this.LimpiarData();
    this.limpiarDataContacto();
  }

  Agregar(newData : string){
    // this.pasarDatosDireccion();
    console.log("agregando: ", newData);
    switch (newData) {
      case 'contactos':
        this.indiceContact = this.indiceContact + 1;
        //this.newContacto.estado = this.newContacto.estado == true ? 1 : 0
        // if(!this.ValidarContacto()){
        //   this._notyG.noty("warning", "rellene todos datos de contacto", 3500);
        // }else{
          // this.contactos.push(this.newContacto);
          this.ListContactos.push(this.newContacto);
          this.limpiarDataContacto();
        // }
        break;
      case 'direccion':
        this.indiceDirection = this.indiceDirection + 1;
       // this.newDirection.estado = this.newDirection.estado == true ? 1 : 0
        // if(!this.ValidarDireccion()){
        //   this._notyG.noty("warning", "rellene todos los datos de la nueva direccion", 3500);  
        // }
        // else{
          // this.direcciones.push(this.newDirection);

          this.ListDirecciones.push(this.newDirection); 
          this._notyG.noty("success", "direccion añadida", 3500);  
          this.LimpiarData();
          console.log("Lista añadida ", this.ListDirecciones);
        // }
        break;
      default:
        break;
    }
  }
  // Agregar(){
  //   this.pasarDatosDireccion();
   
  //   this.newDirection.estado = this.newDirection.estado == true ? 1 : 0
  //   this.direcciones.push(this.newDirection);
  
  //   this.ListDirecciones.push(this.newDirection); 
    
  //   this.LimpiarData();
     
  // }
  

  pasarDatosDireccion (){
    this.ListSend ={
      "razon_social": this.lista[0].razon_social,
      "sigla": this.lista[0].sigla,
      "id_actividad": this.lista[0].id_actividad_empresarial,
      "nit": this.lista[0].nit,
      "logo_empresa":this.lista[0].logo_empresa ,
      "direcciones": this.direcciones,
      "contactos" : this.contactos
      };
  }

  LimpiarData(){
    this.idCiudad="";
    this.newDirection  = {
      "id_tipo_direccion": 1,
      "estado": 1,
      "direccion": "",
      "id_direccion": 0,
      "tipo_direccion": "Propietario",
      "pais": "",
      "departamento": "",
      "ciudad": "",
      "id_ciudad":""
    };
    this.textPais = "";
    this.textDepartamento = "";
  }

  limpiarDataContacto(){
    this.newContacto =  {
      "id_tipo_contacto" : 33,
      "id_subtipo_contacto" : 2,
      "id_contacto" : "33-2",
      "codigo_contacto" : "",
      "contacto" : "",
      "estado" : 1,
      "tipo": "Fijo"
    };
  }
  // Ocultar secciones
  OcultarSeccion(seccion: string){
    switch (seccion) {
      case 'modulos': 
          this.ocultarSeccion = true;
          break;
      case 'contactos': 
          this.ocultarSeccionContactos = true;
          break;
      case 'direcciones': 
          this.ocultarSeccionDirecciones = true;
          break;
      default:
          console.log('invalid section');
    }
  }
  MostrarSeccion(seccion: string){
    switch (seccion) {
      case 'modulos': 
          this.ocultarSeccion = false;
          break;
      case 'contactos': 
          this.ocultarSeccionContactos = false;
          break;
      case 'direcciones': 
          this.ocultarSeccionDirecciones = false;
          break;
      default:
          console.log('invalid section');
    }
  }

  /** poner estado a uno o cero en las direcciones */
  CambiarTipoEstado(){
    this.ListDirecciones.forEach( element => {
      element = element.estado == 1 ? true : false
    });
  }

  AgregarId(){
    this.ListContactos.forEach(element => {
      element.id_contacto = ""+element.id_tipo_contacto+"-"+element.id_subtipo_contacto;
    });
    this.ListTipoContactos.forEach(element => {
      element.id_contacto = ""+element.id_tipo_contacto+"-"+element.id_tipo;
    });
  }

  ColocarCodigoContacto( ){
    this.newContacto.id_tipo_contacto = this.newContacto.id_contacto.slice(0,2);
    this.newContacto.id_subtipo_contacto = this.newContacto.id_contacto.slice(3);
    this.BuscarNombreTipoContacto( +this.newContacto.id_tipo_contacto, +this.newContacto.id_subtipo_contacto);
    this.newContacto.codigo_contacto = "";
    this.newContacto.contacto = "";
  }

  BuscarNombreTipoContacto(tipo : number, subtipo : number){
    this.ListTipoContactos.forEach( element => {
      if(element.id_tipo_contacto == tipo && element.id_tipo == subtipo){
          this.newContacto.tipo = element.tipo;
      }
    });
  }
  ObtenerPais(codigo : string){
    var codPais = codigo.slice(0, 3);
    return codPais;
  }
  BuscarPais(codigo: string){
    this.ListPaises.forEach(element => {
      if (element.id_pais == codigo){
        this.newDirection.pais = element.nombre_pais;
        this.textPais = element.nombre_pais;
      }
    });
  }
  ObtenerDepartamento(codigo : string){
    var codDep = codigo.slice(0, 5);
    return codDep;
  }
  BuscarDepartamento(codigo : string){
    this.ListDepartamentos.forEach( element => {
      if(element.id_pais == codigo){
        this.newDirection.departamento = element.nombre_pais;
        this.textDepartamento = element.nombre_pais;
      }
    });
  }
  BuscarNombreCiudad(codigo : string){
    this.ListCiudades.forEach( element => {
      if(element.id_pais == codigo){
        this.newDirection.ciudad = element.nombre_pais;
      }
    });
  }
  MostrarCiudad(data : any){
    if(this.editar){
        console.log("editar ciudad: ", data);
          this.BuscarDepartamento(this.ObtenerDepartamento(this.idCiudad));
          this.BuscarPais(this.ObtenerPais(this.idCiudad));
          this.newDirection.id_ciudad = this.idCiudad;
          this.BuscarNombreCiudad(this.idCiudad);
          this.ListDirecciones[this.ListDirecciones.length-1].pais= this.textPais; 
          this.ListDirecciones[this.ListDirecciones.length-1].departamento= this.textDepartamento; 
          this.ListDirecciones[this.ListDirecciones.length-1].ciudad= this.newDirection.ciudad; 
          this.ListDirecciones[this.ListDirecciones.length-1].id_ciudad= this.idCiudad; 
    }else{
      console.log("No editar: ", data);
      this.ListCiudades.forEach(element => {
        if(element.nombre_pais == data.ciudad){
          this.idCiudad = element.id_pais;
          this.textPais = data.pais;
          this.textDepartamento = data.departamento;
        }
      });
    }
  }
  /**metodos auxiliares del tab */
  // validadores
  ValidarDireccion(){
    if(this.newDirection.direccion == "" || this.newDirection.id_ciudad== ""){
      return false;
    }
    return true;

  }
  ValidarContacto(){
    if(this.newContacto.contacto == ""){
      return false;
    }
    return true;
  }
  // por implements 
  ValidarDatosEmpresa(){

  }
  Eliminar(){

  }

  ActualizarDatos1(img : File){
    console.log("lista para guardar: ", this.ListSend);
    this._adm007Service
    .ActualizarDatos1(this.ListSend,img)
    .subscribe(resp => {
      if(resp["ok"]){
        // console.log("datos actualizados component");
        this._notyG.noty("success", "datos actualizados", 3500);
      }
      else {
        this._notyG.noty("error", "no se pudo actualizar", 3500);
        console.log("error al guardar los datos");
        console.log(resp);
      }
    });
  }
  onPhotoSelected(event: HtmlInputEvent): void {
    const extensionesValidas = ["image/png", "image/jpg", "image/jpeg"];
    const extensionArchivo = event.target.files[0].type;
    if (extensionesValidas.indexOf(extensionArchivo) === -1) {
      this._notyG.noty("error", "Formato novalido, Solo formato imagen", 5000);
      return;
    }
    if (event.target.files && event.target.files[0]) {
      console.log("Elemento Event",event);
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    } else {
      return;
    }
  }
}
