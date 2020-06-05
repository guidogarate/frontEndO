import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import url from "src/app/master/config/url.config";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private http: HttpClient) {}

  downloadFile(data, ruta: string) {
    const REQUEST_PARAMS = new HttpParams().set("fileName", data.fileName);
    const REQUEST_URI = `${url.prod}${ruta}`;
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      responseType: "arraybuffer",
    });
  }
}
