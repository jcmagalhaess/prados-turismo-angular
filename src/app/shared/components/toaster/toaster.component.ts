import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule, MatSnackBarRef } from "@angular/material/snack-bar";
import { ToasterService } from "./toaster.service";

@Component({
    selector: "app-toaster",
    imports: [MatSnackBarModule, MatButtonModule],
    standalone: true,
    templateUrl: "./toaster.component.html",
    styleUrl: "./toaster.component.scss"
})
export class ToasterComponent {
  get message() {
    return this._toaster.message;
  }

  constructor(
    public readonly snackBarRef: MatSnackBarRef<ToasterComponent>,
    private readonly _toaster: ToasterService
  ) {}
}
