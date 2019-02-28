import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnergradeComponent } from './partnergrade.component';

describe('PartnergradeComponent', () => {
  let component: PartnergradeComponent;
  let fixture: ComponentFixture<PartnergradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnergradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnergradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
