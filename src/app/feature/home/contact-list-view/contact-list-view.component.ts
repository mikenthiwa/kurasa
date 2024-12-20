import { ChangeDetectionStrategy, Component, inject, input, OnChanges, signal } from '@angular/core';
import { Contact } from '../../../core/home/models/contact.model';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormModalComponent } from '../contact-form-modal/contact-form-modal.component';

@Component({
  selector: 'app-contact-list-view',
  imports: [MatTableModule, MatCheckboxModule, MatIconModule, MatButtonModule],
  templateUrl: './contact-list-view.component.html',
  styleUrl: './contact-list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListViewComponent implements OnChanges {
  contacts = input<Contact[]>();
  displayedColumns: string[] = [
    'select',
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'physicalAddress',
    'actions',
  ];
  dataSource = new MatTableDataSource<Contact>(this.contacts());
  initialSelection = signal([]);
  allowMultiSelect = signal(true);

  private dialog = inject(MatDialog);

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Contact>(this.contacts());
  }
  selection = new SelectionModel<Contact>(this.allowMultiSelect(), this.initialSelection());

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row: Contact) => this.selection.select(row));
    }
  }

  viewContact(contact: Contact) {
    this.dialog.open(ContactFormModalComponent, {
      width: '480px',

      data: {
        modalTitle: 'View Contact',
        submitButtonLabel: 'Submit',
        formData: contact,
      },
    });
  }
}
