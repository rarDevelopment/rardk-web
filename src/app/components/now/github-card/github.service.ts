import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubSearchResult } from 'src/app/components/now/github-card/models/github-search-result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getGithubRecentlyUpdatedRepositories(): Observable<GithubSearchResult> {
    return this.http.get<GithubSearchResult>(`${environment.apiUrl}now/json/github`);
  }
}
