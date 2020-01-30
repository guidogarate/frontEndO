import { Component, OnInit } from '@angular/core';
import { Adm004Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/index.global";

declare function initLabels ();

@Component({
  selector: "app-adm004",
  templateUrl: "./adm004.component.html",
  styleUrls: ["./adm004.component.css"]
})
export class Adm004Component implements OnInit {

  /** modificador de estado modo Vista / edicion */
  editar : boolean = false;
  /* para el encabezado*/
  Lista : any = [];
  parametrosIniciales: any = [];
  idGestion : string ;

  /* Para seccion Moneda*/
  parametroMoneda : any = [];
  moneda : any;
  listImputacion : any;
  listConversion : any;
  idImputacion : string = "" ;
  idConversion : string = "";

  /* Seccion Folio*/

  folio : any;
  TipoFolio : any;
  idFolio : string = "";
  prefijo : any;
  valorPrefijo : boolean = true;
  sepFolio : any;
  sepFolioGestion : any;
  sepFolioPeriodo : any;
  sepFolioDocumento : any;
  digFolio : any;
  idDigito : string = "";
  textoFolio : string = "";
  // textPrefijo : string = "INV";
  /** parametros especiales */
  parametroEspecial : any;
  listaParametrosEspeciales : any = [];
  /** Unidad de negocio */
  unidadNegocio : any;
  CheckUniNeg : any;
  selectUniNegocio : any;
  ListUnidadNegocio : any = [];
  idUnidadNegocio : string = "";
  /** regisro Maestro */
  registroMaestro : any ;
  tipoRegistroMaestro : any;
  idTipoRegistro : string = "";
  numerador : any;
  idNumerador : string = "";
  adicionadorPrefijo : any;
  separadorRol : any;
  cantDigitos : any;
  idCantDigito : string = "";
  textoRegMaestro : string = "";

  /** para enviar a modificar */
  ListParametrosSend : any;
  EstadoInicial : any;

  constructor(
    private _adm004Service: Adm004Service,
    private notyG: NotyGlobal
  ) { }

  ngOnInit() {
    this.ObtenerParametrosIniciales();
    
    setTimeout(() => {
      this.ObtenerParametrosFoliacion();
      setTimeout(() => { 
        this.ObtenerParametrosMoneda();
        this.ObtenerParametrosEspeciales();
        setTimeout(() => {
          this.ObtenerParametrosUnidadNegocio();
          setTimeout(() => {
            this.ObtenerParametrosRegistroMaestro();
          }, 500);
        },500);
        initLabels();
      }, 1000);
    }, 1500);
  }

  CargarParametrosPorGestion(){

    this.ObtenerParametrosFoliacion();
    setTimeout(() => {
      this.ObtenerParametrosEspeciales();
      this.ObtenerParametrosMoneda();
    }, 1000);
    setTimeout(() => {
      this.ObtenerParametrosUnidadNegocio();
      setTimeout(() => {
        this.ObtenerParametrosRegistroMaestro();
      }, 500);
    },500);
    initLabels();

  }

  ObtenerParametrosIniciales(){
    this._adm004Service
    .ObtenerParametros()
    .subscribe(resp => {
      if(["ok"])
      {
        this.parametrosIniciales = resp["datos1"];
        this.idGestion = ""+this.parametrosIniciales[3].adpiatr1;
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Iniciales", 3500);
      }
    });
  }

  ObtenerParametrosMoneda(){
    this._adm004Service
    .ObtenerParametrosMoneda(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {   
        this.moneda = resp["datos2"][0];
        this.listImputacion = resp["datos2"][1];
        this.idImputacion= this.listImputacion.adpiatr1;
        this.listConversion = resp["datos2"][2];
        this.idConversion = this.listConversion.adpiatr1;
        setTimeout(() => {
          initLabels();
        }, 1000);
      
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Moneda", 3500);
      }
    });
  }

  ObtenerParametrosFoliacion(){
    // console.warn("datos id gestion Foliacion",this.idGestion);
    setTimeout(() => {
      // console.log("carga wey");
    }, 1000);
    this._adm004Service
    .ObtenerParametrosFolio(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        if(resp["datos3"]== undefined)
        {
          // console.log("no cargo foliacion");
          // console.info("id gestion folio: ", this.idGestion)
        }else{
          this.folio = resp["datos3"][0];
          this.TipoFolio = resp["datos3"][1];
          this.idFolio = this.TipoFolio.adpiatr1;
          this.prefijo = resp["datos3"][2];
          this.sepFolio = resp["datos3"][3];
          this.sepFolioGestion = resp["datos3"][4];
          this.sepFolioPeriodo = resp["datos3"][5];
          this.sepFolioDocumento = resp["datos3"][6];
          this.digFolio = resp["datos3"][7];
          this.idDigito = this.digFolio.adpiatr1;
         this.rellenarDig(); 
          // console.log("folio: ", resp["datos3"]);
          this.ColocarPrefijo();
        }
        
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros de Foliacion", 3500);
      }
    });
  }

  rellenarDig(){
    // console.log(this.idFolio);
    let i = 0;
    this.digFolio.content.forEach(element => {
      i = element.nume ; 
    });
    // console.log(i);
    const cantidad = 6;
    while(i < cantidad){
      this.digFolio.content.push(
        {
          "nume": i+1
        }
      );

      i++;
    }
    return i;
  }
  ObtenerParametrosEspeciales(){
    this._adm004Service
    .ObtenerParametrosEspeciales(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        if(resp["datos4"]== undefined)
        {
          // console.log("no cargo foliacion");
        }else{
          this.listaParametrosEspeciales = resp["datos4"];
          // console.log("Parametros Especiales total: ", this.listaParametrosEspeciales);
          this.parametroEspecial = this.listaParametrosEspeciales[0];
          console.log("Parametros Especial: ", this.parametroEspecial);
          this.listaParametrosEspeciales.shift();
          // console.log("Parametros Especiales shift: ", this.listaParametrosEspeciales);
        }
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Especiales", 3500);
      }
    });
  }

  ObtenerParametrosUnidadNegocio(){
    this._adm004Service
    .ObtenerParametrosUnidadNegocio(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        if(resp["datos5"]== undefined)
        {
          console.log("no cargo foliacion");
        }else{
          // console.log(resp["datos5"]);
          this.ListUnidadNegocio = resp["datos5"];
          // console.log("List Unit Negocio: ", this.ListUnidadNegocio);
          this.unidadNegocio =this.ListUnidadNegocio[0];
          this.CheckUniNeg = this.ListUnidadNegocio[1];
          this.selectUniNegocio = this.ListUnidadNegocio[2];
         
          this.ListUnidadNegocio.shift();
          this.ListUnidadNegocio.shift();
          this.ListUnidadNegocio.shift();
          // this.idUnidadNegocio = ""+this.CalcularIdNiveles(this.ListUnidadNegocio);
          this.idUnidadNegocio = ""+(this.ListUnidadNegocio.length);
          this.CalcularIdNiveles();
          // console.log("unidad de negocio call: ", this.idUnidadNegocio);
        }
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Unidad de negocio", 3500);
      }
    });
  }

  CalcularIdNiveles(){
    let vf = 80;
    let inicio = +this.idUnidadNegocio;
    let cantidad = 6;
    // console.log("inicio: ", inicio);
    while( inicio < cantidad){
      this.selectUniNegocio.content.push(
        {
          "nume": inicio+1
        }
      );
      this.ListUnidadNegocio.push(
        {
          "adpicori": vf + (inicio+1),
          "adpidesc": "Nivel "+ (inicio+1),
          "adpiatr1": inicio+1,
          "adpiatr2": ""
      },
      );
      inicio++;
    }
    // console.log("calculado select Unid Neg: ", this.selectUniNegocio);
    // console.log("calculado listaUnidades: ", this.ListUnidadNegocio);
  }

  LimpiarNiveles(){
    let i = 0;
    this.ListUnidadNegocio.forEach( element => {
      if(element.adpiatr1 > this.idUnidadNegocio){
        element.adpiatr2 = "";
      }

    });
  }

  // CalcularIdNiveles(lista : any){
  //   let index = lista.findIndex(elemento => elemento.adpiatr2 == null);
  //   console.log("calculando id: " , index);
  //   if(index == -1){
  //     index = lista.length;
  //   }
  //   return index;
  // }

  ObtenerParametrosRegistroMaestro(){
    this._adm004Service
    .ObtenerParametrosRegistroMaestro(this.idGestion)
    .subscribe(resp => {
      if(resp["ok"]){
        this.registroMaestro = resp["datos6"][0];
        this.tipoRegistroMaestro = resp["datos6"][1];
        this.idTipoRegistro = this.tipoRegistroMaestro.adpiatr1;
        this.numerador = resp["datos6"][2];
        this.idNumerador = this.numerador.adpiatr1;
        this.adicionadorPrefijo = resp["datos6"][3];
        this.separadorRol = resp["datos6"][4];
        this.cantDigitos = resp["datos6"][5];  
        this.idCantDigito = this.cantDigitos.adpiatr1;
        this.CantidadDigitos(); 
        this.ColocarPrefijoRegMaestro();
        // console.log("Reg Maestro: " , resp["datos6"]);      
      }
      else{
        this.notyG.noty("error", "no se pudo Obtener Parametros Registro Maestro", 3500);
      }
    });
  }

  CantidadDigitos(){
    
    let i = 0;
    this.cantDigitos.content.forEach(element => {
      i = element.nume ; 
    });
    // console.log("unidad de negocio digitos :" , i);
    const cantidad = 6;
    while(i < cantidad){
      this.cantDigitos.content.push(
        {
          "nume": i+1
        }
      );

      i++;
    }
    return i;
  }

  ActualizarParametros() {
    // console.log("lista parametros: ",this.ListParametrosSend);
    // console.log(this.idGestion);
    this._adm004Service
      .ActualizarParametros(this.ListParametrosSend, this.idGestion)
      .subscribe(resp => {
        if (resp["ok"]) {
          // console.info(resp);
          this.notyG.noty("success", "parametros actualizados", 3500);
        } else {
          // console.error(resp);
          this.notyG.noty("error", "No se pudo actualizar", 3500);
        }
      });
  }

  ModoEdicion(){
    this.editar = true;
    this.guardarEstadoFormulario();
    // this.Cargar();
  }

  Actualizar(){
    this.editar = true;
    if(this.validarDatos()){
      this.ActualizarParametros();
      this.editar = false;
    }else {
      console.log("no hubo cambios para actualizar");
    }
    
  }

  ModoVista(){
    this.editar = false;
    this.Cancelar();
    this.textoFolio = "";
    // this.ColocarPrefijo();
    // this.ColocarPrefijoRegMaestro();
  }
  guardarEstadoFormulario(){
    this.Cargar();
    // console.log(this.ListParametrosSend);
  }

  volverEstado(){
    this.moneda.content = this.EstadoInicial[0].adpiatr1;
    this.idImputacion = this.EstadoInicial[1].adpiatr1;
    this.idConversion = this.EstadoInicial[2].adpiatr1;
    this.idFolio = this.EstadoInicial[3].adpiatr1;
    this.prefijo.content = this.EstadoInicial[4].adpiatr1;
    this.sepFolioGestion.adpiatr2 = this.EstadoInicial[5].adpiatr2;
    this.sepFolioDocumento.adpiatr2 = this.EstadoInicial[6].adpiatr2;
    this.sepFolioDocumento.adpiatr2 = this.EstadoInicial[7].adpiatr2;
    this.idDigito = this.EstadoInicial[8].adpiatr1;
    this.listaParametrosEspeciales[0].content = this.EstadoInicial[9].adpiatr1;
    this.listaParametrosEspeciales[1].content = this.EstadoInicial[10].adpiatr1;
    this.listaParametrosEspeciales[2].content = this.EstadoInicial[11].adpiatr1;
    this.listaParametrosEspeciales[3].content = this.EstadoInicial[12].adpiatr1;
    this.listaParametrosEspeciales[4].content = this.EstadoInicial[13].adpiatr1;
    this.listaParametrosEspeciales[5].content = this.EstadoInicial[14].adpiatr1;
    this.idTipoRegistro = this.EstadoInicial[15].adpiatr1;
    this.idNumerador = this.EstadoInicial[16].adpiatr1;
    this.adicionadorPrefijo.content = this.EstadoInicial[17].adpiatr1;
    this.separadorRol.adpiatr2 = this.EstadoInicial[18].adpiatr2;
    this.idCantDigito = this.EstadoInicial[19].adpiatr1;
    this.CheckUniNeg.content = this.EstadoInicial[20].adpiatr1;
    this.idUnidadNegocio = this.EstadoInicial[21].adpiatr1;
    this.ListUnidadNegocio[0].adpiatr2 = this.EstadoInicial[22].adpiatr2;
    this.ListUnidadNegocio[0].adpiatr1 = this.EstadoInicial[22].adpiatr1;
    this.ListUnidadNegocio[1].adpiatr2 = this.EstadoInicial[23].adpiatr2;
    this.ListUnidadNegocio[1].adpiatr1 = this.EstadoInicial[23].adpiatr1;
    this.ListUnidadNegocio[2].adpiatr2 = this.EstadoInicial[24].adpiatr2;
    this.ListUnidadNegocio[2].adpiatr1 = this.EstadoInicial[24].adpiatr1;
    this.ListUnidadNegocio[3].adpiatr2 = this.EstadoInicial[25].adpiatr2;
    this.ListUnidadNegocio[3].adpiatr1 = this.EstadoInicial[25].adpiatr1;
    this.ListUnidadNegocio[4].adpiatr2 = this.EstadoInicial[26].adpiatr2;
    this.ListUnidadNegocio[4].adpiatr1 = this.EstadoInicial[26].adpiatr1;
    this.ListUnidadNegocio[5].adpiatr2 = this.EstadoInicial[27].adpiatr2;
    this.ListUnidadNegocio[5].adpiatr1 = this.EstadoInicial[27].adpiatr1;

  }
  Cancelar() {
    if(this.validarDatos()){
        // console.log("guardar cambios?");
        let valor = window.confirm("Guardar cambios antes de salir?");
        // console.log("guardar? : ", valor);
        if(valor){
          this.ActualizarParametros();
          console.log("actualizando");
        }else {
          this.volverEstado();
          console.log("volviendo estado anterior");
        }
    }else{ console.log("no Hubo Cambios =)");}
  }

  validarDatos(){

      let estadoPrimario = JSON.stringify( this.ListParametrosSend);
      this.EstadoInicial = JSON.parse(estadoPrimario);
      this.Cargar();
      // console.log("estado: ", estado);
      // console.log("estado: ", this.ListParametrosSend);
      var i;
      for (i in this.ListParametrosSend) {
        if((this.ListParametrosSend[i].adpicori>33 && this.ListParametrosSend[i].adpicori < 37)
            || this.ListParametrosSend[i].adpicori == 64){
         
              if(this.ListParametrosSend[i].adpiatr2 != this.EstadoInicial[i].adpiatr2 ){
                return true;
              }
              // console.log("i: ", i +" - "+ this.ListParametrosSend[i].adpicori );
              // console.log("i: ", i +" - "+ this.ListParametrosSend[i].adpiatr2 );
              // console.log("i: ", i +" - "+ estado[i].adpicori );
              // console.log("i: ", i +" - "+ estado[i].adpiatr2 );
        }
        else{

          if(this.ListParametrosSend[i].adpicori > 80 && this.ListParametrosSend[i].adpicori < 87   ){

              if(this.EstadoInicial[i].adpiatr2  != this.ListParametrosSend[i].adpiatr2 ){
                return true;
              }
              // console.log("i: ", i +" - "+ this.ListParametrosSend[i].adpiatr1 );
              // console.log("i: ", i +" - "+ this.ListParametrosSend[i].adpiatr2 );
              // console.log("j: ", i +" - "+ estado[i].adpiatr1 );
              // console.log("j: ", i +" - "+ estado[i].adpiatr2 );
          }else{
            if(this.EstadoInicial[i].adpiatr1  != this.ListParametrosSend[i].adpiatr1 ){
              return true;
            }
            // console.log("i: ", i +" - "+ this.ListParametrosSend[i].adpicori );
            // console.log("i: ", i +" - "+ this.ListParametrosSend[i].adpiatr1 );
            // console.log("j: ", i +" - "+ estado[i].adpicori );
            // console.log("j: ", i +" - "+ estado[i].adpiatr1 );
          }
        }
      }
      return false;
  }

  /*funciones auxiliares*/
  ColocarPrefijo(){
    let pref : string = "Inv";
    //console.info("valor Check: ", this.prefijo.content);
    if(this.prefijo == undefined){
        console.log("no se puede cargar prefijos");
    }
    else{

      if(this.prefijo.content == true){
        this.textoFolio = pref;
            if (this.idFolio == "3"){
              this.textoFolio = this.textoFolio + this.sepFolioGestion.adpiatr2 
                                + "2019"+this.sepFolioPeriodo.adpiatr2
                                +"01"+this.sepFolioDocumento.adpiatr2;
            }
            if(this.idFolio == "2"){
              this.textoFolio = this.textoFolio + this.sepFolioGestion.adpiatr2 
                                + "2019"+this.sepFolioPeriodo.adpiatr2;
            }
            if(this.idFolio == "1"){
              this.textoFolio = this.textoFolio + this.sepFolioDocumento.adpiatr2;
  
            }
      }else{
        // console.info("False: ", this.prefijo.content);
        this.textoFolio = "";
        if (this.idFolio == "3"){
          this.textoFolio = this.textoFolio 
                            + "2019"+this.sepFolioPeriodo.adpiatr2
                            +"01"+this.sepFolioDocumento.adpiatr2;
        }
        if(this.idFolio == "2"){
          this.textoFolio = this.textoFolio  
                            + "2019"+this.sepFolioDocumento.adpiatr2;
        }
        if(this.idFolio == "1"){
          this.textoFolio = this.textoFolio;
  
        }
      }
      this.CambiarDigitoFolio();
    }
  }
  CambiarDigitoFolio(){
    let textDigito : string = "";
    textDigito = "1";
    textDigito = textDigito.padStart(+(this.idDigito),'0');
    this.textoFolio = this.textoFolio+textDigito;
  }
  // VerTipoFolio(){

  // }
  // CambiarSeparadorFoliacion(){

  // }
  // VerFolioEjemplo(){
   
  // }

  Cargar(){
    this.ListParametrosSend =
    [ 
        {
          "adpicori": "20",
          "adpiatr1": this.moneda.content
        },
        {
          "adpicori": "21",
          "adpiatr1": +this.idImputacion
        },
        {
          "adpicori": "22",
          "adpiatr1": +this.idConversion
        },
        {
          "adpicori": "31",
          "adpiatr1": +this.idFolio
        },
        {
          "adpicori": "32",
          "adpiatr1": this.prefijo.content
        },
        {
          "adpicori": "34",
          "adpiatr2": this.sepFolioGestion.adpiatr2
        },
        {
          "adpicori": "35",
          "adpiatr2": this.sepFolioPeriodo.adpiatr2
        },
        {
          "adpicori": "36",
          "adpiatr2": this.sepFolioDocumento.adpiatr2
        },
        {
          "adpicori": "37",
          "adpiatr1": this.idDigito
        },
        {
          "adpicori": "41",
          "adpiatr1": this.listaParametrosEspeciales[0].content
        },
        {
          "adpicori": "42",
          "adpiatr1": this.listaParametrosEspeciales[1].content
        },
        {
          "adpicori": "43",
          "adpiatr1": this.listaParametrosEspeciales[2].content
        },
        {
          "adpicori": "44",
          "adpiatr1": this.listaParametrosEspeciales[3].content
        },
        {
          "adpicori": "45",
          "adpiatr1": this.listaParametrosEspeciales[4].content
        },
        {
          "adpicori": "46",
          "adpiatr1": this.listaParametrosEspeciales[5].content
        },
        {
          "adpicori": "61",
          "adpiatr1": +this.idTipoRegistro
        },
        {
          "adpicori": "62",
          "adpiatr1": +this.idNumerador
        },
        {
          "adpicori": "63",
          "adpiatr1": this.adicionadorPrefijo.content
        },
        {
          "adpicori": "64",
          "adpiatr2": this.separadorRol.adpiatr2
        },
        {
          "adpicori": "65",
          "adpiatr1": +this.idCantDigito
        },
        {
          "adpicori": "71",
          "adpiatr1": this.CheckUniNeg.content
        },
        {
          "adpicori": "72",
          "adpiatr1": +this.idUnidadNegocio
        },
        {
          "adpicori": "81",
          "adpiatr2": this.ListUnidadNegocio[0].adpiatr2,
          "adpiatr1": +this.ListUnidadNegocio[0].adpiatr1
        },
        {
          "adpicori": "82",
          "adpiatr2": this.ListUnidadNegocio[1].adpiatr2,
          "adpiatr1": +this.ListUnidadNegocio[1].adpiatr1 
        },
        {
          "adpicori": "83",
          "adpiatr2": this.ListUnidadNegocio[2].adpiatr2,
          "adpiatr1": +this.ListUnidadNegocio[2].adpiatr1,
        },
        {
          "adpicori": "84",
          "adpiatr2": this.ListUnidadNegocio[3].adpiatr2,
          "adpiatr1": +this.ListUnidadNegocio[3].adpiatr1
        },
        {
          "adpicori": "85",
          "adpiatr2": this.ListUnidadNegocio[4].adpiatr2,
          "adpiatr1": +this.ListUnidadNegocio[4].adpiatr1
        },
        {
          "adpicori": "86",
          "adpiatr2": this.ListUnidadNegocio[5].adpiatr2,
          "adpiatr1": +this.ListUnidadNegocio[5].adpiatr1
        }
    ];
  
    // console.log("lista para enviar: " ,this.ListParametrosSend);
  }

  /*funciones auxiliares*/
  ColocarPrefijoRegMaestro(){
    let pref : string = "CLI";
 
    if(this.adicionadorPrefijo == undefined){
      console.log("no se cargo prefijo reg maestro: ", this.adicionadorPrefijo);
    }
    else{
      if(this.adicionadorPrefijo.content == true){
        this.textoRegMaestro = pref+ this.separadorRol.adpiatr2;
      }else{
        this.textoRegMaestro = "";
      }
      this.CambiarDigitoRegMaestro();
    }
  }
  CambiarDigitoRegMaestro(){
    let textDigito : string = "";
    textDigito = "1";
    textDigito = textDigito.padStart(+(this.idCantDigito),'0');
    this.textoRegMaestro = this.textoRegMaestro+textDigito;
  }
/** Metodo zombie */
  nada(){}
}
