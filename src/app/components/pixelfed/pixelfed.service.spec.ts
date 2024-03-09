import { TestBed } from '@angular/core/testing';

import { PixelfedService } from './pixelfed.service';

describe('PixelfedService', () => {
  let service: PixelfedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixelfedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
