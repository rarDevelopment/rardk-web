import { GithubRepository } from './github-repository';

export class GithubSearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[];
}
