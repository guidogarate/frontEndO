import { NgModule } from "@angular/core";

import * as cont from "./index.shared.service";

@NgModule({
  providers: [cont.Cont003Service, cont.Cont004Service]
})
export class IndexCont000Module {}
