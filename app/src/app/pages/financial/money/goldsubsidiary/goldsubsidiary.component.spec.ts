import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldsubsidiaryComponent } from './goldsubsidiary.component';

describe('GoldsubsidiaryComponent', () => {
  let component: GoldsubsidiaryComponent;
  let fixture: ComponentFixture<GoldsubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldsubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldsubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
