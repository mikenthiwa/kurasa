import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { ContactListViewComponent } from '../contact-list-view/contact-list-view.component';
import { HomeService } from '../../../core/home/home.service';
import { Contact } from '../../../core/home/models/contact.model';
import { ViewTypeModel } from '../../../core/home/models/view-type.model';
import { ToggleComponent } from '../../../ui/toggle/toggle.component';
import { ContactGridViewComponent } from '../contact-grid-view/contact-grid-view.component';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormModalComponent } from '../contact-form-modal/contact-form-modal.component';
import { CustomModalComponent } from '../../../ui/custom-modal/custom-modal.component';
import { CustomSearchComponent } from '../custom-search/custom-search.component';

@Component({
  selector: 'app-home-page',
  imports: [ContactListViewComponent, ToggleComponent, ContactGridViewComponent, AsyncPipe, CustomSearchComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private homeService: HomeService = inject(HomeService);
  private dialog = inject(MatDialog);

  contacts: Observable<Contact[]> = this.homeService.getContacts$();
  viewTypes: WritableSignal<ViewTypeModel[]> = signal([
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ]);

  activeViewType: WritableSignal<ViewTypeModel> = signal(this.viewTypes()[0]);

  toggleViewType(viewType: ViewTypeModel) {
    this.activeViewType.set(viewType);
  }

  viewContact(contact: Contact) {
    const modal = this.dialog.open(ContactFormModalComponent, {
      width: '480px',
      data: {
        modalTitle: 'View Contact',
        submitButtonLabel: 'Submit',
        formData: contact,
      },
    });
    modal.componentInstance.submitModal.subscribe((contact: Contact) => {
      this.homeService.updateContact(contact);
    });
  }
  deleteContact(contact: Contact) {
    const modal = this.dialog.open(CustomModalComponent);
    modal.componentInstance.modalTitle.set('Delete Contact');
    modal.componentInstance.modalContent.set('Are you sure you want to delete this contact?');
    modal.componentInstance.submitModal.subscribe(() => {
      this.homeService.deleteContact(contact);
    });
  }

  searchContact(searchTerm: string) {
    this.contacts = this.homeService.searchContacts(searchTerm);
  }
}
