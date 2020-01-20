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
      this.socketStatus = true;
      this.salir("macc");
    });

    this.socket.on("disconnect", () => {
      console.log("desconectado del servidor");
      this.socketStatus = false;
    });
  }

  salir(nombre: string) {
    this.socket.emit("salir", { nombre }, resp => {
      console.log("saliendo-angular");
    });
  }
}
