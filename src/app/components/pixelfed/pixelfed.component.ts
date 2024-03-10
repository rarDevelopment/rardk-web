import { Component, OnInit } from '@angular/core';
import { PixelfedPost } from 'src/app/models/pixelfed/pixelfed-post';
import { PixelfedService } from './pixelfed.service';
import { take } from 'rxjs';
import { NgFor } from '@angular/common';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

@Component({
  selector: 'app-pixelfed',
  standalone: true,
  imports: [NgFor, PageTitleComponent],
  templateUrl: './pixelfed.component.html',
  styleUrl: './pixelfed.component.scss',
})
export class PixelfedComponent implements OnInit {
  public pixelfedPosts: PixelfedPost[];
  public isLoading: boolean;

  constructor(private pixelfedService: PixelfedService) {}

  ngOnInit() {
    this.isLoading = true;
    this.populatePixelfedPosts();
  }

  populatePixelfedPosts() {
    this.pixelfedService
      .getPixelfedPosts()
      .pipe(take(1))
      .subscribe({
        next: (posts: PixelfedPost[]) => {
          this.pixelfedPosts = posts;
          console.log(posts);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }
}
