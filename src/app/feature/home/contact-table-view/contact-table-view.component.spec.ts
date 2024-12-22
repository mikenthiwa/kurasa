import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTableViewComponent } from './contact-table-view.component';

describe('ContactListComponent', () => {
  let component: ContactTableViewComponent;
  let fixture: ComponentFixture<ContactTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTableViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
