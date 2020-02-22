import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPersonnelDetailComponent } from './register-personnel-detail.component';

describe('RegisterPersonnelDetailComponent', () => {
  let component: RegisterPersonnelDetailComponent;
  let fixture: ComponentFixture<RegisterPersonnelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPersonnelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPersonnelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
