import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlepublishComponent } from './articlepublish.component';

describe('ArticlepublishComponent', () => {
  let component: ArticlepublishComponent;
  let fixture: ComponentFixture<ArticlepublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlepublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlepublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
