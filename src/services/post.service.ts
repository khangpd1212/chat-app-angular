import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Post {
  id: string;
  name: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(
      'https://6361f20c7521369cd0615fa5.mockapi.io/posts'
    );
  }

  getPostDetail(id: string) {
    return this.http.get<Post>(
      `https://6361f20c7521369cd0615fa5.mockapi.io/posts/${id}`
    );
  }
  update(post: Post) {
    return this.http.put<Post>(
      `https://6361f20c7521369cd0615fa5.mockapi.io/posts/${post.id}`,
      post
    );
  }
  delete(id: string) {
    return this.http.delete(
      `https://6361f20c7521369cd0615fa5.mockapi.io/posts/${id}`
    );
  }
}
