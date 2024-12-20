import {
  ChangeDetectionStrategy,
  Component,
  OutputEmitterRef,
  output,
  Inject,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Contact } from '../../../core/home/models/contact.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-custom-modal',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-form-modal.component.html',
  styleUrl: './contact-form-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      modalTitle: string;
      submitButtonLabel: string;
      formData: Contact | undefined;
    }
  ) {}

  isFormUpdate = signal(false);
  submitModal: OutputEmitterRef<never> = output<never>();

  contactForm: FormGroup = new FormGroup({});
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.initForm();
    this.trackValueChanges();
  }

  initForm() {
    this.contactForm = this.fb.group({
      firstName: [this.data.formData?.firstName, Validators.required],
      lastName: [this.data.formData?.lastName, Validators.required],
      email: [this.data.formData?.email, Validators.required],
      phoneNumber: [this.data.formData?.phoneNumber, Validators.required],
      physicalAddress: [this.data.formData?.physicalAddress, Validators.required],
    });
  }

  trackValueChanges() {
    this.contactForm.valueChanges.subscribe(() => {
      this.isFormUpdate.set(true);
    });
  }
}
