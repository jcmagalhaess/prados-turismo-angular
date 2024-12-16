import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss'
})
export class ActionButtonComponent {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() labelLoading: string = '';

  @Output() action = new EventEmitter<void>();

  public emitter() {
    this.action.emit();
  }
}
