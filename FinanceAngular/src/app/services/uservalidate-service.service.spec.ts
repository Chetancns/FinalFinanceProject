import { TestBed } from '@angular/core/testing';

import { UservalidateServiceService } from './uservalidate-service.service';

describe('UservalidateServiceService', () => {
  let service: UservalidateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UservalidateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
