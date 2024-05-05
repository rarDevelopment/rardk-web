import { Component } from '@angular/core';
import { BlogPost } from 'src/app/components/blog/models/blog-post';
import { BlogService } from '../blog.service';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { HtmlDirective } from '../../../directives/html.directive';
import { DateDisplayComponent } from '../../shared/date-display/date-display.component';
import { NgIf } from '@angular/common';
import { MarkdownModule, provideMarkdown, MarkdownService } from 'ngx-markdown';
import { SocialMediaDiscussionComponent } from '../../shared/social-media-discussion/social-media-discussion.component';
import { DiscussionPostsService } from 'src/app/services/discussion-posts.service';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  standalone: true,
  imports: [
    NgIf,
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
  public post: BlogPost;
  public isLoading: boolean;
  public discussionMethod = this.discussionPostsService.getDiscussionPostsForBlog.bind(
    this.discussionPostsService
  );

  constructor(
    private blogService: BlogService,
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
    this.route.paramMap
      .pipe(
        take(1),
        switchMap((routeParams: ParamMap) =>
          this.blogService.getBlogPost(routeParams.get('postId')!)
        )
      )
      .subscribe({
        next: (blogPost: BlogPost) => {
          if (!blogPost) {
            this.router.navigate(['home']);
          }
          this.post = blogPost;
          this.setMeta(blogPost);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }

  setMeta(blogPost: BlogPost) {
    this.meta.updateTag({ property: 'og:title', content: blogPost.attributes.title });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/rarvatar.png',
    });
    this.meta.updateTag({ property: 'og:url', content: this.router.url });
    this.meta.updateTag({
      property: 'og:description',
      content: blogPost.attributes.description,
    });
  }
}
