import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserServicesPage } from './user-services.page';

describe('UserServicesPage', () => {
  let component: UserServicesPage;
  let fixture: ComponentFixture<UserServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
