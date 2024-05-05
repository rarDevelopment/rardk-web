import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FeedItem } from 'src/app/components/shared/feed-posters/models/feed-item';
import { GithubSearchResult } from 'src/app/components/now/github-card/models/github-search-result';
import { GithubService } from './github.service';
import { FeedPostersComponent } from '../../shared/feed-posters/feed-posters.component';

@Component({
  selector: 'app-github-card',
  templateUrl: './github-card.component.html',
  styleUrls: ['./github-card.component.scss'],
  standalone: true,
  imports: [FeedPostersComponent],
})
export class GithubCardComponent implements OnInit {
  constructor(private githubService: GithubService) {}

  public feedItems: FeedItem[];
  public isLoading: boolean;
  public isRepositoriesError: boolean = false;
  private numberOfRepositoriesToTake = 5;

  ngOnInit() {
    this.isLoading = true;
    this.populateGithubSearchResults();
  }

  public async populateGithubSearchResults() {
    this.githubService
      .getGithubRecentlyUpdatedRepositories()
      .pipe(take(1))
      .subscribe({
        next: (result: GithubSearchResult) => {
          const repos = result.items
            .filter((r) => !r.archived)
            .filter((r) => r.topics.includes('active'))
            .slice(0, this.numberOfRepositoriesToTake);
          this.feedItems = repos.map((r) => {
            return {
              title: r.name,
              url: r.html_url,
              summary: r.description,
            } as FeedItem;
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isRepositoriesError = true;
        },
      });
  }
}
