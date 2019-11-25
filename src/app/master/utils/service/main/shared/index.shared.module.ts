import { NgModule } from "@angular/core";

import { SettingService, SidebarService } from "./index.shared.service";

@NgModule({
  providers: [SettingService, SidebarService]
})
export class IndexSharedModule {}
