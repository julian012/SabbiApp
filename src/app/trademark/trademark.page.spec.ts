import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkPage } from './trademark.page';

describe('TrademarkPage', () => {
  let component: TrademarkPage;
  let fixture: ComponentFixture<TrademarkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrademarkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademarkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
