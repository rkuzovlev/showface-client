/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StreamCardBigComponent } from './stream-card-big.component';

describe('StreamCardBigComponent', () => {
  let component: StreamCardBigComponent;
  let fixture: ComponentFixture<StreamCardBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamCardBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamCardBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
