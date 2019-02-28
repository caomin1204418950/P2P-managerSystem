import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerpartnerComponent } from './makerpartner.component';

describe('MakerpartnerComponent', () => {
  let component: MakerpartnerComponent;
  let fixture: ComponentFixture<MakerpartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerpartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerpartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
