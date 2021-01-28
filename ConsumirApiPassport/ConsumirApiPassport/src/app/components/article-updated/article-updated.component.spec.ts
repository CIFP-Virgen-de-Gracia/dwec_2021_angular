import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleUpdatedComponent } from './article-updated.component';

describe('ArticleUpdatedComponent', () => {
  let component: ArticleUpdatedComponent;
  let fixture: ComponentFixture<ArticleUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleUpdatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
