import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleInsertedComponent } from './article-inserted.component';

describe('ArticleInsertedComponent', () => {
  let component: ArticleInsertedComponent;
  let fixture: ComponentFixture<ArticleInsertedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleInsertedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleInsertedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
