import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  OnChanges,
  output,
  OutputEmitterRef,
  signal,
  ViewChild,
  inject,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Contact } from '../../../core/home/models/contact.model';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-contact-list-view',
  imports: [MatTableModule, MatCheckboxModule, MatIconModule, MatButtonModule, MatSortModule],
  templateUrl: './contact-list-view.component.html',
  styleUrl: './contact-list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListViewComponent implements OnChanges, AfterViewInit {
  contacts: InputSignal<Contact[] | undefined> = input<Contact[]>();
  viewContact: OutputEmitterRef<Contact> = output<Contact>();
  deleteContact: OutputEmitterRef<Contact> = output<Contact>();
  displayedColumns: string[] = [
    'select',
    'id',
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

  private _liveAnnouncer = inject(LiveAnnouncer);

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  selection = new SelectionModel<Contact>(this.allowMultiSelect(), this.initialSelection());

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Contact>(this.contacts());
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

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
}
