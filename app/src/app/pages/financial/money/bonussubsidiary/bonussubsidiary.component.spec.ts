import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonussubsidiaryComponent } from './bonussubsidiary.component';

describe('BonussubsidiaryComponent', () => {
  let component: BonussubsidiaryComponent;
  let fixture: ComponentFixture<BonussubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonussubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonussubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
