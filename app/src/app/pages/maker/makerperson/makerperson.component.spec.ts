import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerpersonComponent } from './makerperson.component';

describe('MakerpersonComponent', () => {
  let component: MakerpersonComponent;
  let fixture: ComponentFixture<MakerpersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerpersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
