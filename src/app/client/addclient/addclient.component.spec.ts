import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientComponent } from './addclient.component';

describe('AddclientComponent', () => {
  let component: AddclientComponent;
  let fixture: ComponentFixture<AddclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddclientComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
