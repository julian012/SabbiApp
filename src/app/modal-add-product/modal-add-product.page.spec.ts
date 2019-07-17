import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddProductPage } from './modal-add-product.page';

describe('ModalAddProductPage', () => {
  let component: ModalAddProductPage;
  let fixture: ComponentFixture<ModalAddProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddProductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
