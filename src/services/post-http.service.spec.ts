import { PostService } from 'src/services/post.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('Test http with HttpClientTestingModule', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;
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
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return posts when getPosts() is called', (done: DoneFn) => {
    service.getPosts().subscribe((res) => {
      expect(res).toEqual(POSTS);
      done();
    });
    const req = httpTestingController.expectOne(
      'https://6361f20c7521369cd0615fa5.mockapi.io/posts'
    );
    req.flush(POSTS);
    expect(req.request.method).toBe('GET');
  });

  it('should return posts when getPostDetail() is called', (done: DoneFn) => {
    service.getPostDetail(POSTS[0].id).subscribe((res) => {
      expect(res).toEqual(POSTS[0]);
      done();
    });
    const req = httpTestingController.expectOne(
      `https://6361f20c7521369cd0615fa5.mockapi.io/posts/${POSTS[0].id}`
    );
    req.flush(POSTS[0]);
    expect(req.request.method).toBe('GET');
  });

  it('should return posts when update() is called', (done: DoneFn) => {
    const mockObj = {
      id: '1',
      name: 'dsad',
      avatar: 'dsadsa',
    };
    service.update(mockObj).subscribe((res) => {
      expect(res).toEqual(mockObj);
      done();
    });
    const req = httpTestingController.expectOne(
      `https://6361f20c7521369cd0615fa5.mockapi.io/posts/${mockObj.id}`
    );
    req.flush(mockObj);
    expect(req.request.method).toBe('PUT');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
