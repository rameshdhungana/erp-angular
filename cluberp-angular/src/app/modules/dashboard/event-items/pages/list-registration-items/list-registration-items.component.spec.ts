import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegistrationItemsComponent } from './list-registration-items.component';

describe('ListRegistrationItemsComponent', () => {
  let component: ListRegistrationItemsComponent;
  let fixture: ComponentFixture<ListRegistrationItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRegistrationItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRegistrationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
