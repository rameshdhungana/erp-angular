import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArrivalDepartureReportComponent } from './list-arrival-departure-report.component';

describe('ListArrivalDepartureReportComponent', () => {
  let component: ListArrivalDepartureReportComponent;
  let fixture: ComponentFixture<ListArrivalDepartureReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArrivalDepartureReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArrivalDepartureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
