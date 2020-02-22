import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrganizerComponent } from './detail-organizer.component';

describe('DetailOrganizerComponent', () => {
  let component: DetailOrganizerComponent;
  let fixture: ComponentFixture<DetailOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
