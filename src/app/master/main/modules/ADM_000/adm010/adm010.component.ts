import { Component, OnInit } from "@angular/core";
import { Adm010Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
import { element } from "protractor";
declare function initLabels();

@Component({
  selector: "app-adm010",
  templateUrl: "./adm010.component.html",
  styleUrls: ["./adm010.component.css"]
})
export class Adm010Component implements OnInit {
  editar: boolean = false;
  nuevo: boolean = false;
  lista: any;
  actividadEmpresarial: any = [];
  estructuraPlanDeCuentas: any = [];
  Listnaturalezas: any = [];
  cuentas: any = [];
  allCodigosNaturalezas: any = [];
  UsedAllCodigosNaturalezas: any = [];
  filterAllCodigosNaturalezas: any = [];
  allNaturalezas: any = [];
  gestiones: any = [];
  ultimoElemento: any;
  estructuras: any = [];
  newEstructura: any = {};
  naturalezas: any = [];
  newNaturaleza: any = {};
  listSend: any = {};
  idGestion: number = 2019;
  idActividad: number = 1;
  tope: number = 0;
  topeNaturaleza: number = 0;
  totalLargo: number = 0;
  ListUpdatesPlan: any = [];
  ListUpdatesNaturalezas: any = [];
  ListLastStade: any = [];
  ListLastStadeNaturaleza: any = [];
  ListaforUpdate: any = [];
  agregar: boolean = false;
  constructor(
    private _notyG: NotyGlobal,
    private _adm010Service: Adm010Service
  ) {}

  ngOnInit() {
    this.ObtenerDatos();
  }
  ModoVista(id: string) {
    this.editar = false;
    switch (id) {
      case "salir":
        this.VolverEstadoAnterior();
        console.log("entro a volver estado Anterior");
        break;
      default:
        break;
    }
    this.InicializarEstructura();
    this.InicializarNaturaleza();
    this.ListLastStade = [];
    this.ListLastStadeNaturaleza = [];
  }
  ModoEdicion() {
    this.editar = true;
    this.GuardarEstado();
  }
  Actualizar() {
    this.editar = false;
  }

  nada() {}

  ObtenerDatos() {
    this._adm010Service
      .ObtenerParametrosIniciales(this.idGestion)
      .subscribe(resp => {
        console.log(resp);
        if (resp["ok"]) {
          this.lista = resp["datos"];
          this.estructuraPlanDeCuentas = this.lista[0][
            "estructura_plan_cuentas"
          ];
          if (this.estructuraPlanDeCuentas != null) {
            this.ultimoElemento = this.estructuraPlanDeCuentas[
              this.estructuraPlanDeCuentas.length - 1
            ];
            this.estructuraPlanDeCuentas.pop();
            this.tope = this.estructuraPlanDeCuentas.length;
            this.totalLargo = this.ultimoElemento.largo;
          } else {
            this.ultimoElemento = null;
          }
          this.actividadEmpresarial = this.lista[0]["actividad_empresarial"];
          this.cuentas = this.lista[0]["cuentas"];
          this.allCodigosNaturalezas = this.lista[0]["all_codigos_naturalezas"];
          this.allNaturalezas = this.lista[0]["all_naturalezas"];
          this.gestiones = this.lista[0]["gestiones"];
          this.Listnaturalezas = this.lista[0]["naturalezas"];
          if (this.Listnaturalezas == null) {
            this.Listnaturalezas = [];
          } else {
            this.topeNaturaleza = this.Listnaturalezas.length;
            // this.CargarListasNaturalezas();
          }
          setTimeout(() => {
            initLabels();
          }, 800);
        } else {
          console.log("error: ", resp["mensaje"]);
        }
      });
  }

  EliminarPlanDeCuenta(item: number) {
    console.log("Eliminar plan de cuentas: ", item);
    console.log(
      " count List: ",
      this.estructuraPlanDeCuentas,
      this.estructuraPlanDeCuentas.length
    );
    this.RemoverPlan(item);
    this.Eliminar(item);
    this.tope = this.tope - 1;
  }

  RemoverPlan(id: any) {
    let valor = 1;
    let pos = 1;
    let sum: number = 0;
    let v1: number = -1;
    this.estructuraPlanDeCuentas.forEach(element => {
      if (element.id_estructura == id) {
        valor = element.largo;
        console.error("id a eliminar, elemento, largo: ", id, element, valor);
        v1 = pos;
      }
      sum = Number(sum) + Number(element.largo);
      pos = pos + 1;
      console.log("posicion recorrido del elemento: ", pos);
      console.log("valor del largo actual: ", sum);
    });

    console.log("lista antes de eliminar: ", this.estructuraPlanDeCuentas);
    if (v1 !== -1) {
      console.error("removiendo Posicion v1-1: ", v1 - 1);
      this.estructuraPlanDeCuentas.splice(v1 - 1, 1);
      this.totalLargo = sum - valor;
      this.ultimoElemento.largo = this.totalLargo;
      console.info("valor del largo: ", this.ultimoElemento.largo);
    }
  }

  RemoverNaturaleza(id: any) {
    let valor = 1;
    let pos = 1;
    let v1: number = -1;
    this.Listnaturalezas.forEach(element => {
      if (element.id_codigo == id) {
        valor = element.largo;
        console.log("valor: ", element);
        v1 = pos;
      }
      pos = pos + 1;
      console.log("pos: ", pos);
    });
    console.log("removiendo: ", v1);
    if (v1 !== -1) {
      this.Listnaturalezas.splice(v1 - 1, 1);
    }
  }
  EliminarNaturaleza(item: number) {
    console.log("eliminar naturaleza: ", item);
    this.RemoverNaturaleza(item);
    this.Eliminar(item);
    this.HabilitarEstado(item);
    this.topeNaturaleza = this.topeNaturaleza - 1;
  }

  Insertar() {
    this._adm010Service
      .Insertar(this.listSend, this.idGestion)
      .subscribe(resp => {
        if (resp["ok"]) {
          this.ModoVista("Insert");
          this._notyG.noty("success", "datos guardados exitosamente", 3500);
        } else {
          this._notyG.noty("warning", "no se pudo guardar los datos", 3500);
          this.InicializarEstructura();
        }
      });
  }
  Eliminar(id: number) {
    this._adm010Service.Eliminar(id, this.idGestion).subscribe(resp => {
      if (resp["ok"]) {
        this._notyG.noty("success", "datos eliminados correctamente", 3500);
      } else {
        this._notyG.noty("warning", "no se pudo eliminar los datos", 3500);
        console.log(resp);
      }
    });
  }

  InicializarEstructura() {
    this.newEstructura = {
      id_estructura: 0,
      nombre: "",
      largo: 0,
      separador: ""
    };
  }
  InicializarNaturaleza() {
    this.newNaturaleza = {
      id: 0,
      codigo: 0,
      id_codigo: 0,
      id_naturaleza: 0
    };
  }
  InicializarListsSend() {
    this.listSend = {
      estructuras: this.estructuras,
      naturalezas: this.naturalezas
    };
  }
  InicializarListsUpdates() {
    this.listSend = {
      estructuras: this.ListUpdatesPlan,
      naturalezas: this.ListUpdatesNaturalezas
    };
  }

  Update() {
    this._adm010Service
      .Actualizar(this.listSend, this.idGestion)
      .subscribe(resp => {
        if (resp["ok"]) {
          this.ModoVista("Update");
          this._notyG.noty(
            "success",
            "registro actualizado correctamente",
            3500
          );
        } else {
          this._notyG.noty(
            "warning",
            "no se actualizo los datos, revise los datos",
            3500
          );
        }
      });
  }

  CalcularTotal() {
    let sum: number = 0;
    this.estructuraPlanDeCuentas.forEach(element => {
      sum = sum + +element.largo;
    });

    return sum;
  }

  actualizarLargo() {
    this.ultimoElemento.largo = this.CalcularTotal();
  }
  CalcularLargo() {
    let sum: number = 0;
    this.estructuraPlanDeCuentas.forEach(element => {
      sum = sum + +element.largo;
    });
    if (sum < 13) {
      this._notyG.noty("success", "cantidad aceptada", 1200);
    } else {
      this._notyG.noty("warning", "el total no debe pasar de 12", 1200);
    }
    this.actualizarLargo();
  }

  AgregarPlanDeCuentas() {
    if (this.CalcularTotal() > 11 || this.estructuraPlanDeCuentas.length > 5) {
      this._notyG.noty(
        "warning",
        "el total no debe pasar de 12, la longitud menor igual a 6",
        1200
      );
    } else {
      this.InicializarEstructura();
      this.estructuraPlanDeCuentas.push(this.newEstructura);
      this.ultimoElemento.largo = this.CalcularTotal();
    }
  }

  Guardar() {
    this.ListarNuevos();
    this.InicializarListsUpdates();
    console.log("lista plans update : ", this.ListUpdatesPlan);
    console.log("lista naturalezas update : ", this.ListUpdatesNaturalezas);
    console.log("update: ", this.listSend);
    this.Update();
    this.InicializarListsSend();
    if (this.estructuras.length > 0 || this.naturalezas.length > 0) {
      console.log("lista para Insert: ", this.listSend);
      this.Insertar();
    }
    setTimeout(() => {
      this.ObtenerDatos();
    }, 1000);
    this.ListUpdatesPlan = [];
    this.ListUpdatesNaturalezas = [];
  }

  GuardarEstado() {
    this.estructuraPlanDeCuentas.forEach(element => {
      let AuxEstructura: any = {
        id_estructura: 0,
        nombre: "",
        largo: 0,
        separador: ""
      };
      AuxEstructura.id_estructura = element.id_estructura;
      AuxEstructura.nombre = element.nombre;
      AuxEstructura.largo = element.largo;
      AuxEstructura.separador = element.separador;
      this.ListLastStade.push(AuxEstructura);
    });
    this.Listnaturalezas.forEach(element => {
      let AuxNaturaleza = {
        id_codigo: 0,
        id_naturaleza: 0
      };
      AuxNaturaleza.id_codigo = element.id_codigo;
      AuxNaturaleza.id_naturaleza = element.id_naturaleza;
      this.ListLastStadeNaturaleza.push(AuxNaturaleza);
    });
    console.log(this.ListLastStade);
    console.log(this.ListLastStadeNaturaleza);
  }

  VolverEstadoAnterior() {
    this.estructuraPlanDeCuentas = [];
    this.Listnaturalezas = [];

    this.ListLastStade.forEach(element => {
      let AuxEstructura: any = {
        id_estructura: 0,
        nombre: "",
        largo: 0,
        separador: ""
      };
      AuxEstructura.id_estructura = element.id_estructura;
      AuxEstructura.nombre = element.nombre;
      AuxEstructura.largo = element.largo;
      AuxEstructura.separador = element.separador;
      this.estructuraPlanDeCuentas.push(AuxEstructura);
    });
    console.log(this.ListLastStade);
    console.log(this.estructuraPlanDeCuentas);

    this.ListLastStadeNaturaleza.forEach(element => {
      let AuxNaturaleza = {
        id_codigo: 0,
        id_naturaleza: 0
      };
      AuxNaturaleza.id_codigo = element.id_codigo;
      AuxNaturaleza.id_naturaleza = element.id_naturaleza;
      this.Listnaturalezas.push(AuxNaturaleza);
    });
    this.CalcularLargo();
    this.ListLastStadeNaturaleza = [];
    this.ListLastStade = [];
  }

  ListarNuevos() {
    this.estructuraPlanDeCuentas.forEach(element => {
      if (element.id_estructura == 0) {
        this.estructuras.push(element);
        console.log("ED para insert : ", element);
      } else {
        console.log("ED para update: ", element);
        this.ListUpdatesPlan.push(element);
      }
    });
    this.Listnaturalezas.forEach(element => {
      if (element.id == 0) {
        console.log("NAT para insert: ", element.codigo);
        this.naturalezas.push(element);
      } else {
        console.log("NAT para update: ", element);
        this.ListUpdatesNaturalezas.push(element);
      }
    });
  }

  AgregarNaturaleza() {
    if (this.estructuraPlanDeCuentas.length > 8) {
      this._notyG.noty("warning", "el total no debe pasar de 9", 1200);
    } else {
      this.InicializarNaturaleza();
      this.Listnaturalezas.push(this.newNaturaleza);
    }
  }
  // Metodo para Filtar Listas para que no se repitan en las opciones de Select

  ObtenerListaUsedNaturalezas() {
    if (this.Listnaturalezas != undefined && this.Listnaturalezas.length > 0) {
      this.Listnaturalezas.forEach(element => {
        let AuxNaturaleza = {
          id_codigo: 0,
          codigo: 0
        };
        AuxNaturaleza.id_codigo = element.id_codigo;
        AuxNaturaleza.codigo = element.codigo;
        this.UsedAllCodigosNaturalezas.push(AuxNaturaleza);
      });
    }
    console.log("Lista USados: ", this.UsedAllCodigosNaturalezas);
  }

  ObtenerListaNaturalezasDisponibles() {
    console.log("used: ", this.UsedAllCodigosNaturalezas);
    console.log("all: ", this.allCodigosNaturalezas);

    if (
      this.UsedAllCodigosNaturalezas != undefined &&
      this.UsedAllCodigosNaturalezas.length > 0
    ) {
      this.allCodigosNaturalezas.forEach(element => {
        let val: boolean = false;
        this.UsedAllCodigosNaturalezas.forEach(oneNature => {
          console.log("compare: ", element, oneNature);
          if (oneNature.id_codigo == element.id_codigo) {
            val = true;
          }
        });
        console.log("elemento: ", val, element);
        if (val == false) {
          this.filterAllCodigosNaturalezas.push(element);
        }
      });
    }
    console.log("lista Filtrada:", this.filterAllCodigosNaturalezas);
  }

  CargarListasNaturalezas() {
    this.ObtenerListaUsedNaturalezas();
    this.ObtenerListaNaturalezasDisponibles();
  }

  ActualizarEstadoNaturaleza(data: any) {
    console.log(data);
    let valor: string = data.codigo;
    this.allCodigosNaturalezas.forEach(elemento => {
      if (elemento.id_codigo == data.id_codigo) {
        elemento.estado = 1;
        data.codigo = elemento.codigo;
        console.log(elemento);
        console.log(valor);
      }
    });
    this.allCodigosNaturalezas.forEach(elemento => {
      if (elemento.codigo == valor) {
        elemento.estado = 0;
        console.log(elemento);
        console.log(valor);
      }
    });
  }

  HabilitarEstado(id: number) {
    console.log("Habilitando elemento: ", id);

    this.allCodigosNaturalezas.forEach(elemento => {
      if (elemento.id_codigo == id) {
        elemento.estado = 0;
        console.log(elemento);
      }
    });
  }
}
