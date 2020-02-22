import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEditTypeComponent } from './detail-edit-type.component';

describe('DetailEditTypeComponent', () => {
  let component: DetailEditTypeComponent;
  let fixture: ComponentFixture<DetailEditTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEditTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEditTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
