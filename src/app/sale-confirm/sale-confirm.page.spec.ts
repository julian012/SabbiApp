import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleConfirmPage } from './sale-confirm.page';

describe('SaleConfirmPage', () => {
  let component: SaleConfirmPage;
  let fixture: ComponentFixture<SaleConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleConfirmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
