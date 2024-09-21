import { Component, ElementRef, ViewChild } from '@angular/core';
import { LastfmCardComponent } from './lastfm-card/lastfm-card.component';
import { GoodreadsCardComponent } from './goodreads-card/goodreads-card.component';
import { TvShowsCardComponent } from './tv-shows-card/tv-shows-card.component';
import { LetterboxdCardComponent } from './letterboxd-card/letterboxd-card.component';
import { BackloggdCardComponent } from './backloggd-card/backloggd-card.component';
import { GithubCardComponent } from './github-card/github-card.component';
import { PageTitleComponent } from '../shared/page-title/page-title.component';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';

@Component({
  selector: 'app-now',
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.scss'],
  standalone: true,
  imports: [
    PageTitleComponent,
    GithubCardComponent,
    BackloggdCardComponent,
    LetterboxdCardComponent,
    TvShowsCardComponent,
    GoodreadsCardComponent,
    LastfmCardComponent,
    TooltipDirective,
  ],
})
export class NowComponent {
  @ViewChild('projectsCard') projectsCard: ElementRef;
  @ViewChild('gamesCard') gamesCard: ElementRef;
  @ViewChild('moviesCard') moviesCard: ElementRef;
  @ViewChild('tvCard') tvCard: ElementRef;
  @ViewChild('booksCard') booksCard: ElementRef;
  @ViewChild('musicCard') musicCard: ElementRef;

  public scrollToProjects() {
    this.scrollToSection(this.projectsCard);
  }

  public scrollToGames() {
    this.scrollToSection(this.gamesCard);
  }

  public scrollToMovies() {
    this.scrollToSection(this.moviesCard);
  }

  public scrollToTv() {
    this.scrollToSection(this.tvCard);
  }

  public scrollToBooks() {
    this.scrollToSection(this.booksCard);
  }

  public scrollToMusic() {
    this.scrollToSection(this.musicCard);
  }

  public scrollToSection(element: ElementRef<any>) {
    const yOffset = -25;
    const y = element.nativeElement.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
