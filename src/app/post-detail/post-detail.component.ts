import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  @Input() post?: Post;
  @Output() delete = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  deletePost(id: string) {
    this.delete.emit(id);
  }
}
