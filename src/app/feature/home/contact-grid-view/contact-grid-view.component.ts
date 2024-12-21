import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ContactCardComponent } from '../../../ui/contact-card/contact-card.component';
import { Contact } from '../../../core/home/models/contact.model';

@Component({
  selector: 'app-contact-grid-view',
  imports: [MatGridListModule, ContactCardComponent],
  templateUrl: './contact-grid-view.component.html',
  styleUrl: './contact-grid-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactGridViewComponent {
  contacts: InputSignal<Contact[] | undefined> = input.required<Contact[] | undefined>();
  viewContact: OutputEmitterRef<Contact> = output<Contact>();
  deleteContact: OutputEmitterRef<Contact> = output<Contact>();
}
