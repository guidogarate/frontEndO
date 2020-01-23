import { Component, OnInit } from '@angular/core';
import { Adm004Service } from 'src/app/master/utils/service/ADM-004/Adm004.service';

import { NotyGlobal } from "src/app/master/utils/global/index.global";

declare function initLabels ();

@Component({
  selector: 'app-adm004',
  templateUrl: './adm004.component.html',
  styleUrls: ['./adm004.component.css']
})
export class Adm004Component implements OnInit {

  /** modificador de estado modo Vista / edicion */
  editar : boolean = false;
  /* para el encabezado*/
  Lista : any = [];
  parametrosIniciales: any = [];
  idGestion : string ="2019";

  /* Para seccion Moneda*/
  parametroMoneda : any = [];
  moneda : any;
  listImputacion : any;
  listConversion : any;
  idImputacion : string = "1" ;
  idConversion : string = "1";

  /* Seccion Folio*/

  folio : any;
  TipoFolio : any;
  idFolio : string = "1";
  prefijo : any;
  valorPrefijo : boolean = true;
  sepFolio : any;
  sepFolioGestion : any;
  sepFolioPeriodo : any;
  sepFolioDocumento : any;
  digFolio : any;
  idDigito : string = "1";
  textoFolio : string = "INV-2019-01-1";
  // textPrefijo : string = "INV";
  /** parametros especiales */
  parametroEspecial : any;
  listaParametrosEspeciales : any = [];
  /** Unidad de negocio */
  unidadNegocio : any;
  CheckUniNeg : any;
  selectUniNegocio : any;
  ListUnidadNegocio : any = [];
  idUnidadNegocio : string = "1";
  /** regisro Maestro */
  registroMaestro : any ;
  tipoRegistroMaestro : any;
  idTipoRegistro : string = "1";
  numerador : any;
  idNumerador : string = "1";
  adicionadorPrefijo : any;
  separadorRol : any;
  cantDigitos : any;
  idCantDigito : string = "1";
  textoRegMaestro : string = "INV-2019-01-1";

  /** para enviar a modificar */
  ListParametrosSend : any;

  constructor(
    private _adm004Service: Adm004Service,
    private notyG: NotyGlobal
  ) { }

  ngOnInit() {
    this.ObtenerParametrosIniciales();
    this.ObtenerParametrosFoliacion();
    setTimeout(() => {
      
        this.ObtenerParametrosEspeciales();
        ///this.ObtenerParametrosMoneda();
        setTimeout(() => {
        //  this.ObtenerParametrosUnidadNegocio();
            setTimeout(() => {
         //     this.ObtenerParametrosRegistroMaestro();
            }, 500);
        },500);
      initLabels();
    }, 1000);
  }

  CargarParametrosPorGestion(){
    this.ObtenerParametrosFoliacion();
    setTimeout(() => {
      this.ObtenerParametrosEspeciales();
      this.ObtenerParametrosMoneda();
    }, 500);
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
        this.listConversion = resp["datos2"][2];
        setTimeout(() => {
          initLabels();
        }, 1000);
        console.log("moneda: " , resp["datos2"]);
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Moneda", 3500);
      }
    });
  }

  ObtenerParametrosFoliacion(){
    this._adm004Service
    .ObtenerParametrosFolio(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        // console.warn("datos Foliacion",resp["dastos3"]);
        this.folio = resp["datos3"][0];
        this.TipoFolio = resp["datos3"][1];
        this.prefijo = resp["datos3"][2];
        this.sepFolio = resp["datos3"][3];
        this.sepFolioGestion = resp["datos3"][4];
        this.sepFolioPeriodo = resp["datos3"][5];
        this.sepFolioDocumento = resp["datos3"][6];
        this.digFolio = resp["datos3"][7];
       this.rellenarDig(); 
        console.log("folio: ", resp["datos3"]);
        // console.log("prefijo: ", this.prefijo);
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros de Foliacion", 3500);
      }
    });
  }

  rellenarDig(){
    console.log(this.idFolio);
    let i = 0;
    this.digFolio.content.forEach(element => {
      i = element.nume ; 
    });
    console.log(i);
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
        this.listaParametrosEspeciales = resp["datos4"];
        // console.log("Parametros Especiales total: ", this.listaParametrosEspeciales);
        this.parametroEspecial = this.listaParametrosEspeciales[0];
        console.log("Parametros Especial: ", this.parametroEspecial);
        this.listaParametrosEspeciales.shift();
        // console.log("Parametros Especiales shift: ", this.listaParametrosEspeciales);
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Especiales", 3500);
      }
    });
  }

  ObtenerParametrosUnidadNegocio(){
    console.log("unid Neg gestion: " , this.idGestion);
    this._adm004Service
    .ObtenerParametrosUnidadNegocio(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        console.log(resp["datos5"]);
        this.ListUnidadNegocio = resp["datos5"];
        console.log("List Unit Negocio: ", this.ListUnidadNegocio);
        this.unidadNegocio =this.ListUnidadNegocio[0];
        this.CheckUniNeg = this.ListUnidadNegocio[1];
        this.selectUniNegocio = this.ListUnidadNegocio[2];
       
        this.ListUnidadNegocio.shift();
        this.ListUnidadNegocio.shift();
        this.ListUnidadNegocio.shift();
        // this.idUnidadNegocio = ""+this.CalcularIdNiveles(this.ListUnidadNegocio);
        this.idUnidadNegocio = ""+(this.ListUnidadNegocio.length);
        this.CalcularIdNiveles();
        console.log("unidad de negocio call: ", this.idUnidadNegocio);
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
    console.log("inicio: ", inicio);
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
    console.log("calculado select Unid Neg: ", this.selectUniNegocio);
    console.log("calculado listaUnidades: ", this.ListUnidadNegocio);
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
        this.numerador = resp["datos6"][2];
        this.adicionadorPrefijo = resp["datos6"][3];
        this.separadorRol = resp["datos6"][4];
        this.cantDigitos = resp["datos6"][5];  
        this.CantidadDigitos(); 
        console.log("Reg Maestro: " , resp["datos6"]);      
      }
      else{
        this.notyG.noty("error", "no se pudo Obtener Parametros Registro Maestro", 3500);
      }
    });
  }

  CantidadDigitos(){
    //console.log(this.CantidadDigitos);
    let i = 0;
    this.cantDigitos.content.forEach(element => {
      i = element.nume ; 
    });
    console.log("unidad de negocio digitos :" , i);
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
    console.log("lista parametros: ",this.ListParametrosSend);
    console.log(this.idGestion);
    this._adm004Service
      .ActualizarParametros(this.ListParametrosSend, this.idGestion)
      .subscribe(resp => {
        if (resp["ok"]) {
          console.info(resp);
          this.notyG.noty("success", "parametros actualizados", 3500);
        } else {
          console.error(resp);
          this.notyG.noty("error", "No se pudo actualizar", 3500);
        }
      });
  }

  ModoEdicion(){
    this.editar = true;
    this.Cargar();
  }

  Actualizar(){
    this.editar = true;
    this.Cargar();
    this.ActualizarParametros();
    this.editar = false;
  }

  ModoVista(){
    this.editar = false;
    this.Cancelar();
    this.textoFolio = "";
    this.ColocarPrefijo();
    this.ColocarPrefijoRegMaestro();
  }

  Cancelar() {
    this.moneda.content = this.ListParametrosSend[0].adpiatr1;
    this.idImputacion = this.ListParametrosSend[1].adpiatr1;
    this.idConversion = this.ListParametrosSend[2].adpiatr1;
    this.idFolio = this.ListParametrosSend[3].adpiatr1;
    this.prefijo.content = this.ListParametrosSend[4].adpiatr1;
    this.sepFolioGestion.adpiatr2 = this.ListParametrosSend[5].adpiatr2;
    this.sepFolioDocumento.adpiatr2 = this.ListParametrosSend[6].adpiatr2;
    this.sepFolioDocumento.adpiatr2 = this.ListParametrosSend[7].adpiatr2;
    this.idDigito = this.ListParametrosSend[8].adpiatr1;
    this.listaParametrosEspeciales[0].content = this.ListParametrosSend[9].adpiatr1;
    this.listaParametrosEspeciales[0].content = this.ListParametrosSend[9].adpiatr1;
    this.listaParametrosEspeciales[1].content = this.ListParametrosSend[10].adpiatr1;
    this.listaParametrosEspeciales[2].content = this.ListParametrosSend[11].adpiatr1;
    this.listaParametrosEspeciales[3].content = this.ListParametrosSend[12].adpiatr1;
    this.listaParametrosEspeciales[4].content = this.ListParametrosSend[13].adpiatr1;
    this.listaParametrosEspeciales[5].content = this.ListParametrosSend[14].adpiatr1;
    this.idTipoRegistro = this.ListParametrosSend[15].adpiatr1;
    this.idNumerador = this.ListParametrosSend[16].adpiatr1;
    this.adicionadorPrefijo.content = this.ListParametrosSend[17].adpiatr1;
    this.separadorRol.adpiatr2 = this.ListParametrosSend[18].adpiatr2;
    this.idCantDigito = this.ListParametrosSend[19].adpiatr1;
    this.CheckUniNeg.content = this.ListParametrosSend[20].adpiatr1;
    this.idUnidadNegocio = this.ListParametrosSend[21].adpiatr1;
    this.ListUnidadNegocio[0].adpiatr2 = this.ListParametrosSend[22].adpiatr2;
    this.ListUnidadNegocio[0].adpiatr1 = this.ListParametrosSend[22].adpiatr1;
    this.ListUnidadNegocio[1].adpiatr2 = this.ListParametrosSend[23].adpiatr2;
    this.ListUnidadNegocio[1].adpiatr1 = this.ListParametrosSend[23].adpiatr1;
    this.ListUnidadNegocio[2].adpiatr2 = this.ListParametrosSend[24].adpiatr2;
    this.ListUnidadNegocio[2].adpiatr1 = this.ListParametrosSend[24].adpiatr1;
    this.ListUnidadNegocio[3].adpiatr2 = this.ListParametrosSend[25].adpiatr2;
    this.ListUnidadNegocio[3].adpiatr1 = this.ListParametrosSend[25].adpiatr1;
    this.ListUnidadNegocio[4].adpiatr2 = this.ListParametrosSend[26].adpiatr2;
    this.ListUnidadNegocio[4].adpiatr1 = this.ListParametrosSend[26].adpiatr1;
    this.ListUnidadNegocio[5].adpiatr2 = this.ListParametrosSend[27].adpiatr2;
    this.ListUnidadNegocio[5].adpiatr1 = this.ListParametrosSend[27].adpiatr1;
  }

  /*funciones auxiliares*/
  ColocarPrefijo(){
    let pref : string = "Inv";
    //console.info("valor Check: ", this.prefijo.content);
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
  CambiarDigitoFolio(){
    let textDigito : string = "";
    textDigito = "1";
    textDigito = textDigito.padStart(+(this.idDigito),'0');
    this.textoFolio = this.textoFolio+textDigito;
  }
  VerTipoFolio(){

  }
  CambiarSeparadorFoliacion(){

  }
  VerFolioEjemplo(){
   
  }

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
  
    console.log("lista para enviar: " ,this.ListParametrosSend);
  }

  /*funciones auxiliares*/
  ColocarPrefijoRegMaestro(){
    let pref : string = "CLI";
 
    if(this.adicionadorPrefijo.content == true){
      this.textoRegMaestro = pref+ this.separadorRol.adpiatr2;
      
    }else{
     
      this.textoRegMaestro = "";
      
   
    }
    this.CambiarDigitoRegMaestro();
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
