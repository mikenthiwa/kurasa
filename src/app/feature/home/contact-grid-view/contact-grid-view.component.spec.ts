import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGridViewComponent } from './contact-grid-view.component';

describe('ContactGridViewComponent', () => {
  let component: ContactGridViewComponent;
  let fixture: ComponentFixture<ContactGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactGridViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
