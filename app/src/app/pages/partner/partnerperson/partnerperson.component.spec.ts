import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerpersonComponent } from './partnerperson.component';

describe('PartnerpersonComponent', () => {
  let component: PartnerpersonComponent;
  let fixture: ComponentFixture<PartnerpersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerpersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
