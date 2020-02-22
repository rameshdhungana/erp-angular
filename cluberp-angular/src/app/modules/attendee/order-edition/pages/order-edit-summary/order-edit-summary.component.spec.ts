import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEditSummaryComponent } from './order-edit-summary.component';

describe('OrderEditSummaryComponent', () => {
  let component: OrderEditSummaryComponent;
  let fixture: ComponentFixture<OrderEditSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEditSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEditSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
