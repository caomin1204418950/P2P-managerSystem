import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionsubsidiaryComponent } from './commissionsubsidiary.component';

describe('CommissionsubsidiaryComponent', () => {
  let component: CommissionsubsidiaryComponent;
  let fixture: ComponentFixture<CommissionsubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionsubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionsubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
