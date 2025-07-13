import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeWrapperComponent } from './mfe-wrapper.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MfeWrapperComponent', () => {
  let component: MfeWrapperComponent;
  let fixture: ComponentFixture<MfeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfeWrapperComponent ],
      providers: [
        HttpClient,
        HttpHandler
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
