import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { APP_ROUTES } from "./app.routes";
import { MainModule } from "./master/main/main.module";

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };
import { DeviceDetectorModule } from "ngx-device-detector";

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { IndexGlobalModule } from "./master/utils/global/index.global.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./master/login/login.component";
import { NopagefoundComponent } from "./master/nopagefound/nopagefound.component";

// para cambiar idioma de fechas a español
import es from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";

registerLocaleData(es);
import { LOCALE_ID } from "@angular/core";
// import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from "@angular/service-worker";

@NgModule({
  declarations: [AppComponent, LoginComponent, NopagefoundComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    IndexGlobalModule,
    MainModule,
    APP_ROUTES,
    DeviceDetectorModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es-ES" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
