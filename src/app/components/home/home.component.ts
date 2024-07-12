import { Component } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { BlogComponent } from '../blog/blog.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [PageTitleComponent, BlogComponent, GalleryComponent, PostsComponent],
})
export class HomeComponent {}
