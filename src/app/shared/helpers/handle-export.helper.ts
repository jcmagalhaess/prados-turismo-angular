import { HttpResponse } from "@angular/common/http";
import * as FileSaver from "file-saver";

export class HandleExport {
  public static isFileSaverSupported() {
    try {
      var isFileSaverSupported = !!new Blob();
    } catch (e) {}
  }

  public static saveAs(response: HttpResponse<ArrayBuffer>, fileName?: string) {
    let contentType = response.headers.get("content-type")!;
    let filename = fileName ?? this.getFileName(response);

    if (filename) {
      var blob = new Blob([response.body!], { type: contentType });
      FileSaver.saveAs(blob, filename);
    }
  }

  public static getFileName(response: HttpResponse<ArrayBuffer>) {
    let filename;
    if (response.headers.has("content-disposition")) {
      let contentDisposition = response.headers.get("content-disposition");
      filename = contentDisposition!
        .split(";")
        .find((n: string) => n.includes("filename="))!
        .replace(/filename=|"/g, "")
        .trim();
    } else {
      filename = decodeURIComponent(response.url!).split('filename=').pop()!.split('&')[0];
    }

    return filename;
  }
}
