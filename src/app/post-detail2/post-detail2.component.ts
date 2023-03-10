import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-detail2',
  templateUrl: './post-detail2.component.html',
  styleUrls: ['./post-detail2.component.scss'],
})
export class PostDetail2Component implements OnInit {
  post!: Post;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    id &&
      this.postService.getPostDetail(id).subscribe((res) => (this.post = res));
  }

  save() {
    this.postService.update(this.post).subscribe((res) => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
