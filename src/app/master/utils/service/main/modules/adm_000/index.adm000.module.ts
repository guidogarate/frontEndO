import { NgModule } from "@angular/core";

import { Adm001Service } from "./index.shared.service";
import { Adm002Service } from "./index.shared.service";
import { Adm003Service } from "./index.shared.service";
import { Adm004Service } from "./index.shared.service";
import { Adm007Service } from "./index.shared.service"; 

@NgModule({
  providers: [
              Adm001Service,
              Adm002Service,
              Adm003Service,
              Adm004Service,
              Adm007Service
  ]
})
export class IndexAdm000Module {}
