import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { take, finalize, map } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { HtmlDirective } from '../../../directives/html.directive';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';

import { MarkdownModule, provideMarkdown, MarkdownService } from 'ngx-markdown';
import { SocialMediaDiscussionComponent } from '../../shared/social-media-discussion/social-media-discussion.component';
import { DiscussionPostsService } from 'src/app/services/discussion-posts.service';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../../posts/models/post';
import { PostType } from '../../posts/models/post-type';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    DateDisplayComponent,
    HtmlDirective,
    MarkdownModule,
    RouterLink,
    SocialMediaDiscussionComponent,
  ],
  providers: [provideMarkdown()],
  host: { ngSkipHydration: 'true' },
})
export class BlogPostComponent {
  public post: Post;
  public isLoading: boolean;
  public discussionMethod = this.discussionPostsService.getDiscussionPostsForBlog.bind(
    this.discussionPostsService
  );

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private markdownService: MarkdownService,
    private discussionPostsService: DiscussionPostsService
  ) {}

  ngOnInit() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return `<h${level}><a name="${escapedText}" class="anchor" href="#${escapedText}"><span class="header-link"></span></a>${text}</h${level}>`;
    };

    this.markdownService.renderer.link = (
      href: string,
      title: string | null | undefined,
      text: string
    ): string => {
      return `<a href="${href}" target="_blank">${text}</a>`;
    };

    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      return `<a href="${href}" target="_blank" title="${text}"><img src="${href}" alt="${text}" /></a>`;
    };

    this.isLoading = true;
    combineLatest([this.postsService.getPosts(PostType.Blog), this.route.paramMap])
      .pipe(
        take(1),
        map(([posts, routeParams]) => {
          {
            return {
              posts: posts,
              routeParams: routeParams,
            };
          }
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (result: { posts: Post[]; routeParams: ParamMap }) => {
          this.findAndSetPost(result.posts, result.routeParams);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public findAndSetPost(posts: Post[], routeParams: ParamMap) {
    console.log('canonical_url', routeParams.get('slug'));
    const foundPost = posts.find((post) => post.canonical_url === routeParams.get('slug')!);
    if (!foundPost) {
      console.log('posts', posts);
      this.router.navigate(['blog']);
    }
    this.post = foundPost!;
    this.setMeta(this.post);
  }

  setMeta(post: Post) {
    this.meta.updateTag({ property: 'og:title', content: post.post_title });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/rarvatar.png',
    });
    this.meta.updateTag({ property: 'og:url', content: this.router.url });
    this.meta.updateTag({
      property: 'og:description',
      content: post.post_description,
    });
  }
}
