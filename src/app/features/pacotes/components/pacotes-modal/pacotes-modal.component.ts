import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PacotesParticipantesComponent } from '../pacotes-participantes/pacotes-participantes.component';

@Component({
  selector: 'app-pacotes-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, PacotesParticipantesComponent],
  templateUrl: './pacotes-modal.component.html',
  styleUrl: './pacotes-modal.component.scss'
})
export class PacotesModalComponent {

}
