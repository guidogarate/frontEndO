import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  public socketStatus = false;
  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on("connect", () => {
      console.log("conectado al servidor");
      this.socketStatus = true;
      this.salir("macc");
    });

    this.socket.on("disconnect", () => {
      console.log("desconectado del servidor");
      this.socketStatus = false;
    });
  }

  salir(nombre: string) {
    console.log("salir llamdo");
    this.socket.emit("salir", { nombre }, resp => {
      console.log("saliendo-angular");
    });
  }
}
