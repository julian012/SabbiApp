import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformsPage } from './platforms.page';

describe('PlatformsPage', () => {
  let component: PlatformsPage;
  let fixture: ComponentFixture<PlatformsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
