import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink, RouterModule } from '@angular/router';
import { take, finalize, map } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { HtmlDirective } from '../../../directives/html.directive';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';

import { MarkdownModule, provideMarkdown, MarkdownService } from 'ngx-markdown';
import { SocialMediaDiscussionComponent } from '../../shared/social-media-discussion/social-media-discussion.component';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../../posts/models/post';
import { PostType } from '../../posts/models/post-type';
import { combineLatest } from 'rxjs';
import { Tokens } from 'marked';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  imports: [
    LoadingIndicatorComponent,
    DateDisplayComponent,
    HtmlDirective,
    MarkdownModule,
    RouterLink,
    SocialMediaDiscussionComponent,
    RouterModule
  ],
  providers: [provideMarkdown()],
  host: { ngSkipHydration: 'true' },
})
export class BlogPostComponent {
  public post: Post;
  public isLoading: boolean;
  public postType: PostType = PostType.Blog;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private markdownService: MarkdownService
  ) {}

  ngOnInit() {
    
    this.markdownService.renderer.heading = function({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return `<h${depth}><a name="${escapedText}" class="anchor" href="#${escapedText}"><span class="header-link"></span></a>${text}</h${depth}>`;
    };

    this.markdownService.renderer.link = function({ href, title, tokens }: Tokens.Link): string {
      const text = this.parser.parseInline(tokens);
      return `<a href="${href}" target="_blank">${text}</a>`;
    };

    this.markdownService.renderer.image = ({ href, title, text }: Tokens.Image) => {
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
    const foundPost = posts.find((post) => post.canonical_url === routeParams.get('slug')!);
    if (!foundPost) {
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
