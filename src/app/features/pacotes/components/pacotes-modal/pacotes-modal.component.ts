import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PacotesParticipantesComponent } from '../pacotes-participantes/pacotes-participantes.component';

@Component({
  selector: 'app-pacotes-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, PacotesParticipantesComponent],
  templateUrl: './pacotes-modal.component.html',
  styleUrl: './pacotes-modal.component.scss'
})
export class PacotesModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
