import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventCategoryComponent } from './create-event-category.component';

describe('CreateEventCategoryComponent', () => {
  let component: CreateEventCategoryComponent;
  let fixture: ComponentFixture<CreateEventCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
