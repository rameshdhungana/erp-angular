import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransportationItemsComponent } from './list-transportation-items.component';

describe('ListTransportationItemsComponent', () => {
  let component: ListTransportationItemsComponent;
  let fixture: ComponentFixture<ListTransportationItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTransportationItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransportationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
