import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveInfoComponent } from './approve-info.component';

describe('ApproveInfoComponent', () => {
  let component: ApproveInfoComponent;
  let fixture: ComponentFixture<ApproveInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
