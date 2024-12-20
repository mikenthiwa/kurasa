import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Contact } from '../../core/home/models/contact.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-card',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCardComponent {
  contact = input.required<Contact>();
}
