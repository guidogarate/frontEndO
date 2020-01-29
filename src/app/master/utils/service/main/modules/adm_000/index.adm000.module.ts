import { NgModule } from "@angular/core";

import { Adm003Service } from "./index.shared.service";
import { Adm007Service } from "./index.shared.service"; 

@NgModule({
  providers: [Adm003Service,
              Adm007Service
  ]
})
export class IndexAdm000Module {}
