import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSearchProductPage } from './sales-search-product.page';

describe('SalesSearchProductPage', () => {
  let component: SalesSearchProductPage;
  let fixture: ComponentFixture<SalesSearchProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSearchProductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSearchProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
