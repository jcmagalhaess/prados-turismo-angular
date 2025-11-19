import { DialogRef } from "@angular/cdk/dialog";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { NgClass } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AcessoIndexComponent } from "../../../core/acesso/containers/acesso-index/acesso-index.component";
import { ActionButtonComponent } from "../action-button/action-button.component";

@Component({
  selector: "app-feedback",
  imports: [MatDialogModule, ActionButtonComponent, NgClass],
  standalone: true,
  templateUrl: "./feedback.component.html",
  styleUrl: "./feedback.component.scss",
})
export class FeedbackComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _dialogRef: DialogRef,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    private readonly _breakpointObserver: BreakpointObserver
  ) {}

  public redirecionar() {
    this._dialogRef.close();
    this.authenticate();
  }

  public authenticate() {
    let dialogConfig = {
      minWidth: "30vw",
      maxWidth: "50vw",
    };

    if (this._breakpointObserver.isMatched(Breakpoints.Handset)) {
      dialogConfig = {
        minWidth: "90vw",
        maxWidth: "100vw",
      };
    }

    this._dialog.open(AcessoIndexComponent, {
      ...dialogConfig,
      maxHeight: "80vh",
    });
  }
}
