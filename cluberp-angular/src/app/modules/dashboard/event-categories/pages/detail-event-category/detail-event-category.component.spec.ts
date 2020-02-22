import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEventCategoryComponent } from './detail-event-category.component';

describe('DetailEventCategoryComponent', () => {
  let component: DetailEventCategoryComponent;
  let fixture: ComponentFixture<DetailEventCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEventCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEventCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
