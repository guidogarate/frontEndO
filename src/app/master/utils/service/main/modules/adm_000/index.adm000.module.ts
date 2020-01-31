import { NgModule } from "@angular/core";

import { Adm001Service,
         Adm002Service,
         Adm003Service,
         Adm004Service,
         Adm005Service,
         Adm007Service
} from "./index.shared.service";

@NgModule({
  providers: [
              Adm001Service,
              Adm002Service,
              Adm003Service,
              Adm004Service,
              Adm005Service,
              Adm007Service
  ]
})
export class IndexAdm000Module {}
