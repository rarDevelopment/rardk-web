import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubSearchResult } from 'src/app/components/now/github-card/models/github-search-result';
import { settings } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getGithubRecentlyUpdatedRepositories(): Observable<GithubSearchResult> {
    return this.http.get<GithubSearchResult>(`${settings.apiUrl}now/json/github`);
  }
}
