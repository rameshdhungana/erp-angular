import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccommodationItemsComponent } from './list-accommodation-items.component';

describe('ListAccommodationItemsComponent', () => {
  let component: ListAccommodationItemsComponent;
  let fixture: ComponentFixture<ListAccommodationItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAccommodationItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccommodationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
