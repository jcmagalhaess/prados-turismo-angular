import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from './toaster.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  public message = signal<string>('');
  private durationInSeconds = 3;

  constructor(private readonly _snackBar: MatSnackBar) { }

  public success(toaster: any) {
    this._snackBarModal(toaster, 'toaster-success');
  }

  public error(toaster: any) {
    this._snackBarModal(toaster, 'toaster-error');
  }

  public alert(toaster: any) {
    this._snackBarModal(toaster, 'toaster-alert');
  }

  private _snackBarModal(message: string, style: string) {
    this.message.set(message);

    this._snackBar.openFromComponent(ToasterComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: [style],
    });
  }
}
