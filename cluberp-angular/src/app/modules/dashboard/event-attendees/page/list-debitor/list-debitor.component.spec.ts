import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDebitorComponent } from './list-debitor.component';

describe('ListDebitorComponent', () => {
  let component: ListDebitorComponent;
  let fixture: ComponentFixture<ListDebitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDebitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDebitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
