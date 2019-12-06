import { NgModule } from "@angular/core";
import { ImagenPipe } from "./imagen.pipe";
import { EmailPipe } from "./email.pipe";

@NgModule({
  imports: [],
  declarations: [ImagenPipe, EmailPipe],
  exports: [ImagenPipe, EmailPipe]
})
export class PipesModule {}
