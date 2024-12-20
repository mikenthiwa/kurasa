import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  contacts = input.required<Contact[] | undefined>();
}
