import { TestBed } from '@angular/core/testing';

import { ClientDetailService } from './client-detail.service';

describe('ClientDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientDetailService = TestBed.get(ClientDetailService);
    expect(service).toBeTruthy();
  });
});
