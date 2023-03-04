import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { GithubRepository } from 'src/app/models/github/github-repository';
import { GithubSearchResult } from 'src/app/models/github/github-search-result';
import { GithubService } from './github.service';

@Component({
  selector: 'app-github-card',
  templateUrl: './github-card.component.html',
  styleUrls: ['./github-card.component.scss'],
})
export class GithubCardComponent implements OnInit {
  constructor(private githubService: GithubService) {}

  public githubRepositories: GithubRepository[];
  private numberOfRepositoriesToTake = 5;

  ngOnInit() {
    this.populateGithubSearchResults();
  }

  public async populateGithubSearchResults() {
    this.githubService
      .getGithubRecentlyUpdatedRepositories()
      .pipe(take(1))
      .subscribe((result: GithubSearchResult) => {
        this.githubRepositories = result.items.slice(
          0,
          this.numberOfRepositoriesToTake
        );
      });
  }
}
