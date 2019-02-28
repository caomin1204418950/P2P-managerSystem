import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicScaleComponent } from './pic-scale.component';

describe('PicScaleComponent', () => {
  let component: PicScaleComponent;
  let fixture: ComponentFixture<PicScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
