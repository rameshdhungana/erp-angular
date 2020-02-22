import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartSummaryComponent } from './view-cart-summary.component';

describe('ViewCartSummaryComponent', () => {
  let component: ViewCartSummaryComponent;
  let fixture: ComponentFixture<ViewCartSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCartSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
