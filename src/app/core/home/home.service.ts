import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { contacts } from './mocks/contacts';
import { Contact } from './models/contact.model';
import { Folder } from './models/folder.model';
import { folders } from './mocks/folders';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  contacts: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(contacts);
  contactGroups: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>(folders);
  favouriteContacts: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
  filteredContacts: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(contacts);
  selectedContacts: WritableSignal<Contact[]> = signal<Contact[]>([]);

  getActiveContacts$(): Observable<Contact[]> {
    return this.filteredContacts.asObservable().pipe(map((contacts) => contacts.filter((c) => !c.isDeleted)));
  }

  getAllContacts$(): Observable<Contact[]> {
    return this.contacts.asObservable();
  }

  getFavouriteContacts$(): Observable<Contact[]> {
    return this.favouriteContacts.asObservable();
  }

  getFolders$(): Observable<Folder[]> {
    return this.contactGroups.asObservable();
  }

  updateContact(contact: Contact) {
    this.filteredContacts.next(this.filteredContacts.value.map((c) => (c.id === contact.id ? contact : c)));
  }

  setFavourite(contact: Contact) {
    const index = this.filteredContacts.value.findIndex((c) => c.isFavorite === contact.isFavorite);
    if (index > -1) {
      this.filteredContacts.next(
        this.filteredContacts.value.map((c) => (c.id === contact.id ? { ...c, isFavorite: !c.isFavorite } : c))
      );
    } else {
      this.filteredContacts.next(
        this.filteredContacts.value.map((c) => (c.id === contact.id ? { ...c, isFavorite: true } : c))
      );
    }
  }

  deleteContact(contact: Contact) {
    this.filteredContacts.next(
      this.filteredContacts.value.map((c) => (c.id === contact.id ? { ...c, isDeleted: true } : c))
    );
  }

  searchContacts(searchTerm: string): Observable<Contact[]> {
    return this.getActiveContacts$().pipe(
      map((contacts) =>
        contacts.filter(
          (c) =>
            c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  deleteSelectedContacts() {
    this.selectedContacts().forEach((contact) => {
      this.deleteContact(contact);
    });
  }

  groupContactsByCategory(folder: Folder) {
    if (!folder.name) {
      this.filteredContacts.next(this.contacts.value);
      return;
    }
    this.filteredContacts.next(this.contacts.value.filter((c) => c.category === folder.name));
  }
}
