import { NgModule } from "@angular/core";

import { Adm001Service,
         Adm002Service,
         Adm003Service,
         Adm004Service,
         Adm005Service,
         Adm007Service,
         Adm010Service,
} from "./index.shared.service";

@NgModule({
  providers: [
              Adm001Service,
              Adm002Service,
              Adm003Service,
              Adm004Service,
              Adm005Service,
              Adm007Service,
              Adm010Service,
  ]
})
export class IndexAdm000Module {}
