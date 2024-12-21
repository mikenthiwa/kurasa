import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { contacts } from './mocks/contacts';
import { Contact } from './models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  contacts: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(contacts);
  getContacts$(): Observable<Contact[]> {
    return this.contacts.asObservable().pipe(map((contacts) => contacts.filter((c) => !c.isDeleted)));
  }

  getActiveContacts$(): Observable<Contact[]> {
    return this.getContacts$().pipe(map((contacts) => contacts.filter((c) => !c.isDeleted)));
  }

  updateContact(contact: Contact) {
    this.contacts.next(this.contacts.value.map((c) => (c.id === contact.id ? contact : c)));
  }

  deleteContact(contact: Contact) {
    this.contacts.next(this.contacts.value.map((c) => (c.id === contact.id ? { ...c, isDeleted: true } : c)));
  }

  searchContacts(searchTerm: string): Observable<Contact[]> {
    return this.getContacts$().pipe(
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
}
