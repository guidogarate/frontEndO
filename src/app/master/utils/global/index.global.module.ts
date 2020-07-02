import { NgModule } from "@angular/core";

import { NotyGlobal } from "./index.global";
import { InitGlobal } from "./index.global";
import { PrintGlobal } from "./index.global";
import { DescargaGlobal } from "./index.global";

@NgModule({
  providers: [NotyGlobal, InitGlobal, PrintGlobal, DescargaGlobal],
})
export class IndexGlobalModule {}
