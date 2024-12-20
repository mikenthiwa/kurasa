import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { contacts } from './mocks/contacts';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  getContacts$() {
    return of(contacts);
  }
}
