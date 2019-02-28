import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleresourceComponent } from './articleresource.component';

describe('ArticleresourceComponent', () => {
  let component: ArticleresourceComponent;
  let fixture: ComponentFixture<ArticleresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
