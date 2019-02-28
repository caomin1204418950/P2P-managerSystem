import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleuploadComponent } from './articleupload.component';

describe('ArticleuploadComponent', () => {
  let component: ArticleuploadComponent;
  let fixture: ComponentFixture<ArticleuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
