import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { APP_ROUTES } from "./app.routes";

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { environment } from "src/environments/environment";
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };
import { DeviceDetectorModule } from "ngx-device-detector";

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
// import { LoginMaterialModule } from "./master/login/login.material.module";
import { MainModule } from "./master/main/main.module";
import { IndexGlobalModule } from "./master/utils/global/index.global.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./master/login/login.component";
import { NopagefoundComponent } from "./master/nopagefound/nopagefound.component";
import { from } from "rxjs";

// para cambiar idioma de fechas a español
import es from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";

registerLocaleData(es);
import { LOCALE_ID } from "@angular/core";
@NgModule({
  declarations: [AppComponent, LoginComponent, NopagefoundComponent],
  imports: [
    BrowserModule,
    APP_ROUTES,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    // LoginMaterialModule,
    MainModule,
    SocketIoModule.forRoot(config),
    IndexGlobalModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es-ES" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
