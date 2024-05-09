import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { combineLatest, finalize, map, take } from 'rxjs';
import { Link } from 'src/app/components/links/models/link';
import { LinksService } from 'src/app/components/links/links.service';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { NgIf } from '@angular/common';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';
import { SocialMediaDiscussionComponent } from '../../shared/social-media-discussion/social-media-discussion.component';
import { DiscussionPostsService } from 'src/app/services/discussion-posts.service';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-link-post',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgIf,
    LoadingIndicatorComponent,
    DateDisplayComponent,
    RouterLink,
    SocialMediaDiscussionComponent,
  ],
  templateUrl: './link-post.component.html',
  styleUrl: './link-post.component.scss',
})
export class LinkPostComponent implements OnInit {
  public link: Link;
  public isLoading: boolean;
  public linksService: LinksService;
  public slug: string;
  public discussionMethod = this.discussionPostsService.getDiscussionPostsForLinks.bind(
    this.discussionPostsService
  );

  constructor(
    linksService: LinksService,
    private route: ActivatedRoute,
    private router: Router,
    private discussionPostsService: DiscussionPostsService
  ) {
    this.linksService = linksService;
  }
  ngOnInit(): void {
    this.isLoading = true;
    combineLatest([this.linksService.getLinks(), this.route.paramMap])
      .pipe(
        take(1),
        map(([links, routeParams]) => {
          {
            return {
              links: links,
              routeParams: routeParams,
            };
          }
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (result: { links: Link[]; routeParams: ParamMap }) => {
          this.findAndSetLink(result.links, result.routeParams);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public findAndSetLink(links: Link[], routeParams: ParamMap) {
    const foundLink = links.find((link) => link.slug === routeParams.get('slug')!);
    if (!foundLink) {
      this.router.navigate(['links']);
    }
    this.link = foundLink!;
  }
}
