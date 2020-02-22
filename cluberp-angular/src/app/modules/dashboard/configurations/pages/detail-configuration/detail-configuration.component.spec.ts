import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConfigurationComponent } from './detail-configuration.component';

describe('DetailConfigurationComponent', () => {
  let component: DetailConfigurationComponent;
  let fixture: ComponentFixture<DetailConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
