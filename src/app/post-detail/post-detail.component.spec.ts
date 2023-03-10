import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Post } from 'src/services/post.service';

import { PostDetailComponent } from './post-detail.component';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the post in the anchor element', () => {
    const post: Post = { id: '1', name: 'foo', avatar: 'dsasda' };
    component.post = post;
    fixture.detectChanges();
    const postEl = fixture.nativeElement.querySelector('.name');
    expect(postEl.textContent).toContain(post.name);
  });
});
