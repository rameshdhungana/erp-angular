import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventCategoryComponent } from './list-event-category.component';

describe('ListEventCategoryComponent', () => {
  let component: ListEventCategoryComponent;
  let fixture: ComponentFixture<ListEventCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEventCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
