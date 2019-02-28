import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalsubsidiaryComponent } from './capitalsubsidiary.component';

describe('CapitalsubsidiaryComponent', () => {
  let component: CapitalsubsidiaryComponent;
  let fixture: ComponentFixture<CapitalsubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalsubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalsubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
