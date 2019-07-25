import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSearchClientPage } from './sale-search-client.page';

describe('SaleSearchClientPage', () => {
  let component: SaleSearchClientPage;
  let fixture: ComponentFixture<SaleSearchClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleSearchClientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleSearchClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
