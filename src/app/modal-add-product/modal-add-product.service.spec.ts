import { TestBed } from '@angular/core/testing';

import { ModalAddProductService } from './modal-add-product.service';

describe('ModalAddProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalAddProductService = TestBed.get(ModalAddProductService);
    expect(service).toBeTruthy();
  });
});
