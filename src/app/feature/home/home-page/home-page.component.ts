import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { HomeService } from '../../../core/home/home.service';
import { Contact } from '../../../core/home/models/contact.model';
import { ViewTypeModel } from '../../../core/home/models/view-type.model';
import { ToggleComponent } from '../../../ui/toggle/toggle.component';
import { ContactGridViewComponent } from '../contact-grid-view/contact-grid-view.component';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormModalComponent } from '../contact-form-modal/contact-form-modal.component';
import { CustomModalComponent } from '../../../ui/custom-modal/custom-modal.component';
import { CustomSearchComponent } from '../custom-search/custom-search.component';
import { ContactListViewComponent } from '../contact-list-view/contact-list-view.component';
import { Folder } from '../../../core/home/models/folder.model';
import { GroupFolderComponent } from '../group-folder/group-folder.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home-page',
  imports: [
    ToggleComponent,
    ContactGridViewComponent,
    AsyncPipe,
    CustomSearchComponent,
    ContactListViewComponent,
    MatButton,
    GroupFolderComponent,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  homeService: HomeService = inject(HomeService);
  private dialog = inject(MatDialog);

  contacts: Observable<Contact[]> = this.homeService.getActiveContacts$();
  contactGroups: Observable<Folder[]> = this.homeService.getFolders$();

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

  deleteSelectedContacts() {
    const modal = this.dialog.open(CustomModalComponent);
    modal.componentInstance.modalTitle.set('Delete Contacts');
    modal.componentInstance.modalContent.set('Are you sure you want to delete this contact?');
    modal.componentInstance.submitModal.subscribe(() => {
      this.homeService.deleteSelectedContacts();
    });
  }

  searchContact(searchTerm: string) {
    this.contacts = this.homeService.searchContacts(searchTerm);
  }

  groupContactsByCategory(folder: Folder) {
    this.homeService.groupContactsByCategory(folder);
  }
}
