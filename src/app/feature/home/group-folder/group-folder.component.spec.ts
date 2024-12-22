import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFolderComponent } from './group-folder.component';

describe('GroupFolderComponent', () => {
  let component: GroupFolderComponent;
  let fixture: ComponentFixture<GroupFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupFolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
