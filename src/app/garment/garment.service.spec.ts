import { TestBed } from '@angular/core/testing';

import { GarmentService } from './garment.service';

describe('GarmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GarmentService = TestBed.get(GarmentService);
    expect(service).toBeTruthy();
  });
});
