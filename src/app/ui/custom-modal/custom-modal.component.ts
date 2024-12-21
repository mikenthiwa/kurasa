import { ChangeDetectionStrategy, Component, EventEmitter, model, Output } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-custom-modal',
  imports: [MatDialogTitle, MatDialogActions, MatDialogContent, MatButtonModule, MatDialogClose],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomModalComponent {
  modalTitle = model<string>();
  modalContent = model<string>();
  @Output() submitModal: EventEmitter<never> = new EventEmitter<never>();
}
