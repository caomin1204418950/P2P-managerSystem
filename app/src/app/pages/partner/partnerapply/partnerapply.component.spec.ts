import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerapplyComponent } from './partnerapply.component';

describe('PartnerapplyComponent', () => {
  let component: PartnerapplyComponent;
  let fixture: ComponentFixture<PartnerapplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerapplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerapplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
