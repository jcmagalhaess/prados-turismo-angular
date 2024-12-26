import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionButtonComponent } from '../action-button/action-button.component';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatDialogModule, ActionButtonComponent],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _dialogRef: DialogRef,
    private readonly _router: Router,
  ) {}
  
  public redirecionar() {
    this._dialogRef.close();
    this._router.navigateByUrl('/login');
  }
}
