import { NgModule } from "@angular/core";

import { NotyGlobal } from "./index.global";
import { InitGlobal } from "./init.global";

@NgModule({
  providers: [NotyGlobal, InitGlobal]
})
export class IndexGlobalModule {}
