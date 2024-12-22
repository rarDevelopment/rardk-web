import { Component } from '@angular/core';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { BlogComponent } from '../blog/blog.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { PostsComponent } from '../posts/posts.component';
import { LinksComponent } from '../links/links.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [PageTitleComponent, BlogComponent, GalleryComponent, PostsComponent, LinksComponent]
})
export class HomeComponent {}
