import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreditorComponent } from './list-creditor.component';

describe('ListCreditorComponent', () => {
  let component: ListCreditorComponent;
  let fixture: ComponentFixture<ListCreditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
