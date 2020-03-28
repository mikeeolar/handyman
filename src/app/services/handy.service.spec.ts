import { TestBed } from '@angular/core/testing';

import { HandyService } from './handy.service';

describe('HandyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandyService = TestBed.get(HandyService);
    expect(service).toBeTruthy();
  });
});
