import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  ViewChild,
  inject,
} from '@angular/core';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { Contact } from '../../../core/home/models/contact.model';
import { MatLine } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HomeService } from '../../../core/home/home.service';

@Component({
  selector: 'app-contact-list-view',
  imports: [MatListModule, MatLine, MatIconModule],
  templateUrl: './contact-list-view.component.html',
  styleUrl: './contact-list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListViewComponent {
  contacts: InputSignal<Contact[]> = input.required<Contact[]>();
  viewContact: OutputEmitterRef<Contact> = output<Contact>();
  deleteContact: OutputEmitterRef<Contact> = output<Contact>();

  @ViewChild('allSelected', { static: true }) private allSelected: MatSelectionList = new MatSelectionList();
  private homeService = inject(HomeService);

  onViewContact(event: MouseEvent, contact: Contact): void {
    event.stopPropagation();
    this.viewContact.emit(contact);
  }
  setFavourite(event: MouseEvent, contact: Contact): void {
    event.stopPropagation();
    this.homeService.setFavourite(contact);
  }
  selectAll(): void {
    const allSelected = this.allSelected.selectedOptions.selected.length === this.contacts()?.length;
    if (allSelected) {
      this.allSelected.deselectAll();
      this.homeService.selectedContacts.set([]);
    } else {
      this.allSelected.selectAll();
      this.homeService.selectedContacts.set(this.contacts());
      this.homeService.groupContactsByCategory({ name: '' });
    }
  }

  select(contact: Contact) {
    const selectedContacts = this.homeService.selectedContacts();
    const index = selectedContacts.findIndex((selectedContact) => selectedContact.id === contact.id);
    if (index > -1) {
      this.homeService.selectedContacts.update((contacts) =>
        contacts.filter((selectedContact) => selectedContact.id !== contact.id)
      );
    } else {
      this.homeService.selectedContacts.update((contacts) => [...contacts, contact]);
    }
  }
}
