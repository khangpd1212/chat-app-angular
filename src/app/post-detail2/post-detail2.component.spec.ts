import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetail2Component } from './post-detail2.component';
import { Post, PostService } from 'src/services/post.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('PostDetail2Component', () => {
  let mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get() {
          return '3';
        },
      },
    },
  };
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockLocation: jasmine.SpyObj<Location>;

  let component: PostDetail2Component;
  let fixture: ComponentFixture<PostDetail2Component>;

  beforeEach(() => {
    mockPostService = jasmine.createSpyObj(['getPostDetail', 'update']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [PostDetail2Component],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(PostDetail2Component);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPost()', () => {
    mockPostService.getPostDetail.and.returnValue(
      of({
        id: '3',
        name: 'khang',
        avatar: 'avatar',
      } as Post)
    );
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('h2'))
      .nativeElement as HTMLElement;
    expect(el.textContent).toBe(component.post.name);
  });

  it('should call the update method in Post Service only once', () => {
    mockPostService.update.and.returnValue(
      of({
        id: '3',
        name: 'khangs',
        avatar: 'avatars',
      })
    );
    component.save();
    expect(mockPostService.update).toHaveBeenCalledTimes(1);
  });
});
