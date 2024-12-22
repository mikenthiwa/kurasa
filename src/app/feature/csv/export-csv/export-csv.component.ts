import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Contact } from '../../../core/home/models/contact.model';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-export-csv',
  imports: [MatButton, MatIconModule],
  templateUrl: './export-csv.component.html',
  styleUrl: './export-csv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportCsvComponent {
  contacts = input.required<Contact[]>();
  exportToCSV() {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone Number'];
    const rows = this.contacts().map((contact) => [
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phoneNumber,
    ]);
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
