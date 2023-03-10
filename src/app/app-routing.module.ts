import { PostComponent } from './post/post.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetail2Component } from './post-detail2/post-detail2.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'post', component: PostComponent },
  { path: 'detail/:id', component: PostDetail2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
