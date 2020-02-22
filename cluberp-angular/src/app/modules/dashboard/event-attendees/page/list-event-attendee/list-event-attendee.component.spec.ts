import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventAttendeeComponent } from './list-event-attendee.component';

describe('ListEventAttendeeComponent', () => {
  let component: ListEventAttendeeComponent;
  let fixture: ComponentFixture<ListEventAttendeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEventAttendeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventAttendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
