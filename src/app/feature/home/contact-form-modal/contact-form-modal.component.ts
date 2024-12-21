import {
  ChangeDetectionStrategy,
  Component,
  OutputEmitterRef,
  output,
  Inject,
  inject,
  OnInit,
  signal,
  WritableSignal,
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

  isFormUpdate: WritableSignal<boolean> = signal<boolean>(false);
  submitModal: OutputEmitterRef<Contact> = output<Contact>();

  contactForm: FormGroup = new FormGroup({});
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit() {
    this.initForm();
    this.trackValueChanges();
  }

  initForm() {
    this.contactForm = this.fb.group({
      firstName: [this.data.formData?.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.data.formData?.lastName, [Validators.required, Validators.maxLength(50)]],
      email: [this.data.formData?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.data.formData?.phoneNumber, [Validators.required, Validators.maxLength(15)]],
      physicalAddress: [this.data.formData?.physicalAddress, [Validators.required, Validators.maxLength(100)]],
    });
  }

  trackValueChanges() {
    this.contactForm.valueChanges.subscribe(() => {
      this.isFormUpdate.set(true);
    });
  }

  submit() {
    this.submitModal.emit({ ...this.contactForm.value, id: this.data.formData?.id });
  }
}
