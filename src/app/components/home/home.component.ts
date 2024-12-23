import { Component } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { PostsComponent } from '../posts/posts.component';
import { LinksComponent } from '../links/links.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [BlogComponent, GalleryComponent, PostsComponent, LinksComponent]
})
export class HomeComponent {}
