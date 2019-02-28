import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishproductComponent } from './publishproduct.component';

describe('PublishproductComponent', () => {
  let component: PublishproductComponent;
  let fixture: ComponentFixture<PublishproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
