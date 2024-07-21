
import { Component, OnInit } from '@angular/core';
import { HtmlDirective } from 'src/app/directives/html.directive';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { finalize, take } from 'rxjs';
import { Link } from 'src/app/components/links/models/link';
import { DateDisplayComponent } from '../shared/date-display/date-display.component';
import { LoadingIndicatorComponent } from '../shared/loading-indicator/loading-indicator.component';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/models/post';
import { PostType } from '../posts/models/post-type';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [
    HtmlDirective,
    PageTitleComponent,
    LoadingIndicatorComponent,
    DateDisplayComponent
],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss',
})
export class LinksComponent implements OnInit {
  constructor(private linksService: PostsService) {}
  public links: Link[];
  public isLoading: boolean;

  async ngOnInit() {
    this.populateLinks();
  }

  public populateLinks() {
    this.isLoading = true;
    this.linksService
      .getPosts(PostType.Link)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (linksResponse) => {
          this.links = linksResponse
            .sort((p1, p2) => (p1.posted_at > p2.posted_at ? -1 : 1))
            .map((p: Post) => {
              return {
                dateShared: p.posted_at,
                description: p.content,
                title: p.url_title,
                link: p.url,
                slug: p.time_stamp,
              } as Link;
            });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
