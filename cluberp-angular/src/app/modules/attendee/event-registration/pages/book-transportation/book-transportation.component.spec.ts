import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTransportationComponent } from './book-transportation.component';

describe('BookTransportationComponent', () => {
  let component: BookTransportationComponent;
  let fixture: ComponentFixture<BookTransportationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTransportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
