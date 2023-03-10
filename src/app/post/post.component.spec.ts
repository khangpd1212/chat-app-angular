import { PostDetailComponent } from './../post-detail/post-detail.component';
import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Post, PostService } from 'src/services/post.service';
// import { PostDetailComponent } from '../post-detail/post-detail.component';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let mockPostService: jasmine.SpyObj<PostService>;
  let POSTS: Post[];
  let component: PostComponent;
  let postService: PostService;
  let fixture: ComponentFixture<PostComponent>;
  let detailComponentDEs: DebugElement[];

  beforeEach(() => {
    POSTS = [
      {
        name: 'name 1',
        avatar: 'avatar 1',
        id: '1',
      },
      {
        name: 'name 2',
        avatar: 'avatar 2',
        id: '2',
      },
      {
        name: 'name 3',
        avatar: 'avatar 3',
        id: '3',
      },
    ];
    mockPostService = jasmine.createSpyObj(['getPosts', 'delete']);
    // mockComponent.deletePost.and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [PostComponent, PostDetailComponent],
      providers: [{ provide: PostService, useValue: mockPostService }],
    });

    postService = TestBed.inject(PostService);
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    detailComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostDetailComponent)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test component detail', () => {
    it('with length element', () => {
      expect(detailComponentDEs.length).toEqual(POSTS.length);
    });

    it('with title post detail', () => {
      for (let i = 0; i < detailComponentDEs.length; i++) {
        const postDetailCompInstance = detailComponentDEs[i]
          .componentInstance as PostDetailComponent;
        expect(postDetailCompInstance.post?.name).toBe(POSTS[i].name);
      }
    });
  });

  it('should set posts from the service directly', () => {
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  });

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.delete.and.returnValue(of(true));
      component.posts = POSTS;
    });

    it('should delete the selected Post from the posts', () => {
      component.deletePost('1');
      expect(component.posts.length).toBe(2);
    });

    it('should call the delete method in Post Service only once', () => {
      component.deletePost('1');
      expect(postService.delete).toHaveBeenCalledTimes(1);
    });

    it('should call the actual selected Post in Posts', () => {
      component.deletePost('1');
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[0]);
      }
    });

    it('should call delete method when post component button is clicked', () => {
      spyOn(component, 'deletePost');
      for (let i = 0; i < detailComponentDEs.length; i++) {
        detailComponentDEs[i]
          .query(By.css('button'))
          .triggerEventHandler('click', null);
        expect(component.deletePost).toHaveBeenCalledWith(POSTS[i].id);
      }
    });

    it('should call delete method when the delete event is emitted in Post Component', () => {
      spyOn(component, 'deletePost');
      for (let i = 0; i < detailComponentDEs.length; i++) {
        (
          detailComponentDEs[i].componentInstance as PostDetailComponent
        ).delete.emit(POSTS[i].id);
        expect(component.deletePost).toHaveBeenCalledWith(POSTS[i].id);
      }
    });
  });
});
