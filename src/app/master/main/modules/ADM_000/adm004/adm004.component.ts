import { Component, OnInit } from '@angular/core';
declare function initLabels ();

@Component({
  selector: 'app-adm004',
  templateUrl: './adm004.component.html',
  styleUrls: ['./adm004.component.css']
})
export class Adm004Component implements OnInit {

  ListaTiposEmpresa : any = [];
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      initLabels();
    }, 1000);
  }

}
