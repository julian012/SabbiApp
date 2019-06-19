import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentPage } from './garment.page';

describe('GarmentPage', () => {
  let component: GarmentPage;
  let fixture: ComponentFixture<GarmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
