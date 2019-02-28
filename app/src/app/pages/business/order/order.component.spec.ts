import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { businessorderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: businessorderComponent;
  let fixture: ComponentFixture<businessorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ businessorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(businessorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
