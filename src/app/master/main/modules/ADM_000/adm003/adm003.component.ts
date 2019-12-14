import { Component, OnInit } from '@angular/core';

declare function initLabels ();
declare function initModal();

@Component({
  selector: 'app-adm003',
  templateUrl: './adm003.component.html',
  styleUrls: ['./adm003.component.css']
})
export class Adm003Component implements OnInit {

  Lista: any;
 
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      initLabels();
   //   initModal();
    }, 1000);
  }

}
