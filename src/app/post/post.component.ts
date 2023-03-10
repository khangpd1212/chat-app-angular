import { Component, OnInit } from '@angular/core';
import { Post, PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public posts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    return this.postService.getPosts().subscribe((res) => {
      this.posts = res;
    });
  }

  deletePost(id: string) {
    this.posts = this.posts.filter((post) => post.id !== id);
    return this.postService.delete(id).subscribe();
  }
}
