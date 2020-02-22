import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrganizerComponent } from './list-organizer.component';

describe('ListOrganizerComponent', () => {
  let component: ListOrganizerComponent;
  let fixture: ComponentFixture<ListOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
