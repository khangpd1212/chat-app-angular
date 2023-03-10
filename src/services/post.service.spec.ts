import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let POSTS = [
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

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', [
      'get',
      'delete',
      'put',
    ]);
    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: HttpClient, useValue: httpClientSpyObj },
      ],
    });
    service = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected posts when get posts is called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(POSTS));
    service.getPosts().subscribe({
      next: (res) => {
        expect(res).toEqual(POSTS);
        done();
      },
      error: () => {
        done.fail();
      },
    });
  });

  it('should return expected posts when delete posts is called', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(of(POSTS[0]));
    service.delete(POSTS[0].id).subscribe({
      next: (res) => {
        expect(res).toEqual(POSTS[0]);
        done();
      },
    });
  });

  it('should return expected post when getPostDetail is called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(POSTS[0]));
    service.getPostDetail(POSTS[0].id).subscribe({
      next: (res) => {
        expect(res).toEqual(POSTS[0]);
        done();
      },
      error: (err) => {
        done.fail();
      },
    });
  });

  it('should return expected post when update is called', (done: DoneFn) => {
    const mockObj = {
      id: '1',
      name: 'dsad',
      avatar: 'dsadsa',
    };
    httpClientSpy.put.and.returnValue(of(mockObj));
    service.update(mockObj).subscribe({
      next: (res) => {
        expect(res.id).toEqual(POSTS[0].id);
        done();
      },
      error: (err) => {
        done.fail();
      },
    });
  });
});
