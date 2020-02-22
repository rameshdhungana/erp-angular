import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAccommodationTypeComponent } from './choose-accommodation-type.component';

describe('ChooseAccommodationTypeComponent', () => {
  let component: ChooseAccommodationTypeComponent;
  let fixture: ComponentFixture<ChooseAccommodationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAccommodationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAccommodationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
