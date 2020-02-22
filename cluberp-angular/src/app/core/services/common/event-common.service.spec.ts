import { TestBed } from '@angular/core/testing';

import { EventCommonService } from './event-common.service';

describe('EventCommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventCommonService = TestBed.get(EventCommonService);
    expect(service).toBeTruthy();
  });
});
