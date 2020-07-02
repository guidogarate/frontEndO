import { Injectable } from "@angular/core";

@Injectable()
export class PrintGlobal {
  htmlStart(): string {
    const html: string = `<html>
    <head>
      <title>Ormate</title>
    </head>
    <style type="text/css">
      .footer-print {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
      }
      .footer-div {
        display: flex;
        width: 100%;
        font-size: 15px;
        padding-bottom: 15px 0;
        margin: auto;
        border-bottom: 0.3px solid black;
      }
      .footer-empr {
        width: 50%;
        text-align: left;
        padding-top: 0.5rem;
      }
      .footer-user {
        width: 50%;
        text-align: right;
        padding-top: 0.5rem;
      }
      @media print {
        @page {
          margin: 1.5cm;
          margin-bottom: 2cm;
        }
      }
      table.report-container {
        page-break-after: always;
      }
      thead.report-header {
        display: table-header-group;
      }
      tfoot.report-footer {
        display: table-footer-group;
      }
      .table th,
      .table td {
        padding: 0.75rem 1.25rem;
        vertical-align: top;
        border-top: 1px solid #ddd;
      }
      .centrado {
        text-align: center;
      }
      .font-size-title-comp {
        font-size: 20px;
      }
      .font-size-title-name {
        font-size: 14px;
      }
    </style>
    <body>
      <table class="report-container" style="width: 100%;">`;
    return html;
  }

  header(
    logoEmpr: string,
    sglEmpre: string,
    feImpr: string,
    hrImpr: string,
    nombMod: string
  ): string {
    const html: string = `<thead class='report-header'>
    <tr>
        <th class='report-header-cell'>
          <div class='header-info'>
            <div  style='margin: auto;'>
              <div
                style='display: flex; font-size: 10px; margin: auto;'
              >
                <div  style='width: 50%; display: flex;'>
                  <div>
                    <img
                      src=${logoEmpr} style='width: 100px; height: 100px;'
                      />
                    </div>
                    <div style='padding-left: 25; text-align: left;'>
                      <p class='font-weight-bold ' style='font-size: 16px; margin : 0 0 0.5rem 0; ' >${sglEmpre}</p>
                      <p>Direccion : Av. Monseñor Salvatierra # 150</p>
                      <p>Telf: 33-339868</p>
                      <p>Santa Cruz - Bolivia</p>
                    </div>
                  </div>
                  <div style='width: 50%; text-align: right;'>
                    <p class = 'margin-top-bottom'>Fecha: ${feImpr}</p><p class = 'margin-top-bottom'>Impresión: ${hrImpr}</p> </div> </div> <div style='display: flex;'><div style='width: 25%;'></div><div style='width: 50%; text-align: center; justify-self: center;'><p class = 'margin-top-bottom' style='font-size: 20px; margin : 0 0 0.5rem 0;'>FORMATO IMPRESION</p><p class = 'margin-top-bottom' style='font-size: 14px; margin : 0 0 0.5rem 0;'>${nombMod}</p></div><div style='width: 25%;'></div></div></div></div></th></tr></thead>`;
    return html;
  }

  tableStart(): string {
    const html: string = `<tbody class="report-content">
    <tr>
      <td class="report-content-cell">
        <div class="main" style="padding-bottom: 0.5rem;">
          <table class="table" style="width: 100%;">`;
    return html;
  }

  tableHead2(): string {
    const html: string = `<thead class="centrado">
    <tr class="bg-blue">
      <th style="width: 10%;">Codigo</th>
      <th style="width: 20%;">Descripcion</th>
      <th style="width: 20%;">
        <p>Sigla</p>
        <p style="white-space: nowrap;">Moneda-Imprimir</p>
      </th>
      <th style="width: 20%;">
        <p style="white-space: nowrap;">Tamaño Impresion</p>
        <p style="white-space: nowrap;">Codigo a Imprimir</p>
      </th>
      <th style="width: 15%;">
        <p style="white-space: nowrap;">Logo de Empresa</p>
        <p style="white-space: nowrap;">Nro.Copias</p>
      </th>
      <th style="width: 10%;">
        <p>Estado</p>
        <p>CodigoQr</p>
      </th>
    </tr>
  </thead>`;
    return html;
  }

  tableFooter(usuario: string): string {
    const html: string = `<tfoot class="report-footer">
    <tr>
      <td class="report-footer-cell">
        <footer class="footer-print">
          <div class="footer-info">
            <div class="footer-div">
              <div class="footer-empr">Aplic: Ormate</div>
              <div class="footer-user">Usuario: ${usuario}</div>
            </div>
          </div>
        </footer>
      </td>
    </tr>
  </tfoot>`;
    return html;
  }
}
