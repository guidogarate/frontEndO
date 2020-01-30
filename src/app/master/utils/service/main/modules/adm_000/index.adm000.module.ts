import { NgModule } from "@angular/core";

import { Adm003Service, Adm005Service } from "./index.shared.service";

@NgModule({
  providers: [Adm003Service, Adm005Service]
})
export class IndexAdm000Module {}
