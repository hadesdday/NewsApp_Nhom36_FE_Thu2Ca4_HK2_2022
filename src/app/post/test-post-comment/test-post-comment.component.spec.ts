import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPostCommentComponent } from './test-post-comment.component';

describe('TestPostCommentComponent', () => {
  let component: TestPostCommentComponent;
  let fixture: ComponentFixture<TestPostCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPostCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
