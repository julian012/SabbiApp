import { TestBed } from '@angular/core/testing';

import { SimulateService } from './simulate.service';

describe('SimulateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimulateService = TestBed.get(SimulateService);
    expect(service).toBeTruthy();
  });
});
