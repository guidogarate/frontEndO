import { NgModule } from "@angular/core";

import {
  Adm001Service,
  Adm002Service,
  Adm003Service,
  Adm004Service,
  Adm005Service,
  Adm006Service,
  Adm007Service,
  Adm008Service,
  Adm009Service,
  Adm010Service,
  Adm011Service
} from "./index.shared.service";

@NgModule({
  providers: [
    Adm001Service,
    Adm002Service,
    Adm003Service,
    Adm004Service,
    Adm005Service,
    Adm006Service,
    Adm007Service,
    Adm008Service,
    Adm009Service,
    Adm010Service,
    Adm011Service
  ]
})
export class IndexAdm000Module {}
