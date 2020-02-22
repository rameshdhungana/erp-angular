import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventTypeComponent } from './list-event-type.component';

describe('ListEventTypeComponent', () => {
  let component: ListEventTypeComponent;
  let fixture: ComponentFixture<ListEventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
