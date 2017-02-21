/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageStreamComponent } from './stream.component';

describe('PageStreamComponent', () => {
  let component: PageStreamComponent;
  let fixture: ComponentFixture<PageStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
