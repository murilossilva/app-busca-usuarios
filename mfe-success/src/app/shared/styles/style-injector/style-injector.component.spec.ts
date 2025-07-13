import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleInjectorComponent } from './style-injector.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StyleInjectorComponent', () => {
  let component: StyleInjectorComponent;
  let fixture: ComponentFixture<StyleInjectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleInjectorComponent ],
      providers: [
        HttpClient,
        HttpHandler
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleInjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
