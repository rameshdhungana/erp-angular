import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTransportationItemComponent } from './detail-transportation-item.component';

describe('DetailTransportationItemComponent', () => {
  let component: DetailTransportationItemComponent;
  let fixture: ComponentFixture<DetailTransportationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTransportationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTransportationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
