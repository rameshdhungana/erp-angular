import { TestBed } from '@angular/core/testing';

import { AttendeeEventRegistrationService } from './attendee-event-registration.service';

describe('AttendeeEventRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendeeEventRegistrationService = TestBed.get(AttendeeEventRegistrationService);
    expect(service).toBeTruthy();
  });
});
