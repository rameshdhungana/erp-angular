import { TestBed } from '@angular/core/testing';

import { AttendeeOrderEditService } from './attendee-order-edit.service';

describe('AttendeeOrderEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendeeOrderEditService = TestBed.get(AttendeeOrderEditService);
    expect(service).toBeTruthy();
  });
});
