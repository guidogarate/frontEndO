import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-bienvenido",
  templateUrl: "./bienvenido.component.html",
  styleUrls: ["./bienvenido.component.css"],
})
export class BienvenidoComponent implements OnInit {
  // submodulo: any = [];

  data = [
    {
      titulo: "TRANSACCIONES",
      id: "12",
      ruta: "INVENTARIO",
      subMenu: [
        {
          titulo: "INVENTARIO",
          proceso: "PROCESO ESTANDAR",
          componentes: [
            { titulo: "Maestros de Item", id: "42", ruta: " " },
            { titulo: "Auxiliares de Maestros", id: "43", ruta: " " },
            { titulo: "Almacenes", id: "44", ruta: " " },
            { titulo: "Conceptos de transacciones", id: "45", ruta: " " },
            { titulo: "Equivalentes codigo de Barra", id: "46", ruta: "" },
            { titulo: "Item por Almacen", id: "47", ruta: " " },
            { titulo: "Ubicaciones", id: "48", ruta: "" },
          ],
        },
        {
          titulo: "VENTAS",
          proceso: "PROCESO ESTANDAR",
          componentes: [
            { titulo: "Maestros de Item", id: "50", ruta: " " },
            { titulo: "Auxiliares de Maestros", id: "51", ruta: " " },
            { titulo: "Almacenes", id: "52", ruta: " " },
            { titulo: "Conceptos de transacciones", id: "53", ruta: " " },
            { titulo: "Equivalentes codigo de Barra", id: "54", ruta: " " },
            { titulo: "Item por Almacen", id: "55", ruta: " " },
            { titulo: "Ubicaciones", id: "56", ruta: "" },
          ],
        },
        {
          titulo: "COMPRAS",
          proceso: "PROCESO ESTANDAR",
          componentes: [
            { titulo: "Maestros de Item", id: "50", ruta: " " },
            { titulo: "Auxiliares de Maestros", id: "51", ruta: " " },
            { titulo: "Almacenes", id: "52", ruta: " " },
            { titulo: "Conceptos de transacciones", id: "53", ruta: " " },
            { titulo: "Equivalentes codigo de Barra", id: "54", ruta: " " },
            { titulo: "Item por Almacen", id: "55", ruta: " " },
            { titulo: "Ubicaciones", id: "56", ruta: "" },
          ],
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
