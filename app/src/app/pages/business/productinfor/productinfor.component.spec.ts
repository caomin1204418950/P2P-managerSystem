import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductinforComponent } from './productinfor.component';

describe('ProductinforComponent', () => {
  let component: ProductinforComponent;
  let fixture: ComponentFixture<ProductinforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductinforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductinforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
