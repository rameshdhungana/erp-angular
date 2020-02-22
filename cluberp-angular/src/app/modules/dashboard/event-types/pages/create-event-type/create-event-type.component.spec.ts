import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventTypeComponent } from './create-event-type.component';

describe('CreateEventTypeComponent', () => {
  let component: CreateEventTypeComponent;
  let fixture: ComponentFixture<CreateEventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
