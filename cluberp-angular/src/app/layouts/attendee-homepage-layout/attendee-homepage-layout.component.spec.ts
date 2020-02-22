import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeHomepageLayoutComponent } from './attendee-homepage-layout.component';

describe('AttendeeHomepageLayoutComponent', () => {
  let component: AttendeeHomepageLayoutComponent;
  let fixture: ComponentFixture<AttendeeHomepageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeeHomepageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeHomepageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
