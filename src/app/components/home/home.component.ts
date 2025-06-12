import { Component } from '@angular/core';
import { GalleryComponent } from '../gallery/gallery.component';
import { MediaFeedComponent } from '../now/media-feed/media-feed.component';
import { AllPostsComponent } from '../all-posts/all-posts.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [GalleryComponent, MediaFeedComponent, AllPostsComponent],
})
export class HomeComponent {}
