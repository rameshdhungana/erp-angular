import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccommodationItemComponent } from './detail-accommodation-item.component';

describe('DetailAccommodationItemComponent', () => {
  let component: DetailAccommodationItemComponent;
  let fixture: ComponentFixture<DetailAccommodationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAccommodationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAccommodationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
