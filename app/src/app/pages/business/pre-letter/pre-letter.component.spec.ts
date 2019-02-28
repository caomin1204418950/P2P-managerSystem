import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLetterComponent } from './pre-letter.component';

describe('PreLetterComponent', () => {
  let component: PreLetterComponent;
  let fixture: ComponentFixture<PreLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
