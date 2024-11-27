import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BoardGamesService } from './board-games.service';
import { BoardGame } from 'src/app/components/interests/board-games/models/board-game';
import { finalize, take } from 'rxjs';
import { micromark } from 'micromark';

import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { Router } from '@angular/router';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';
import { FormsModule } from '@angular/forms';
import { settings } from 'src/settings';

@Component({
  selector: 'app-board-games',
  templateUrl: './board-games.component.html',
  styleUrls: ['./board-games.component.scss'],
  standalone: true,
  imports: [PageTitleComponent, LoadingIndicatorComponent, FormsModule],
})
export class BoardGamesCollectionComponent implements OnInit {
  constructor(private boardGamesService: BoardGamesService, private router: Router) {}

  @ViewChild('wantSection') wantSection: ElementRef;
  @ViewChild('ownedSection') ownedSection: ElementRef;

  public wishlistGames: BoardGame[];
  public ownedGames: BoardGame[];
  public isLoadingWishlist: boolean;
  public isLoadingOwnedList: boolean;
  public isErrorWishlist: boolean;
  public isErrorOwnedList: boolean;
  public searchTerm: string = '';

  public boardGameGeekWishlist = settings.boardGameGeekWishlist;
  public boardGameGeekOwnedList = settings.boardGameGeekOwnedList;

  private scrollTitleOffset = 28;
  private sectionMap: { [key: string]: ElementRef } = {};

  ngAfterViewChecked() {
    this.sectionMap = {
      want: this.wantSection,
      owned: this.ownedSection,
    };
  }

  ngOnInit() {
    this.isLoadingWishlist = true;
    this.isLoadingOwnedList = true;
    this.populateWishlist();
    this.populateOwnedList();
  }

  public async populateWishlist() {
    this.boardGamesService
      .getWishlistGames()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoadingWishlist = false;
        })
      )
      .subscribe({
        next: (boardGames: BoardGame[]) => {
          this.wishlistGames = boardGames
            .sort((bg1, bg2) => {
              if (bg1.priority === bg2.priority) {
                return bg1.name > bg2.name ? 1 : -1;
              }
              return bg1.priority > bg2.priority ? 1 : -1;
            })
            .map((g) => this.formatGameProperties(g, true));
        },
        error: (error) => {
          this.isErrorWishlist = true;
          console.error('Error loading wishlist', error);
        },
      });
  }

  public async populateOwnedList() {
    this.boardGamesService
      .getOwnedGames()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoadingOwnedList = false;
        })
      )
      .subscribe({
        next: (boardGames: BoardGame[]) => {
          this.ownedGames = boardGames.map((g) => this.formatGameProperties(g, false));
        },
        error: (error) => {
          this.isErrorOwnedList = true;
          console.error('Error loading owned list', error);
        },
      });
  }

  private formatGameProperties(g: BoardGame, showPriority: boolean) {
    let formattedGame = g;
    if (showPriority) {
      formattedGame.comment = `Priority: ${formattedGame.priority}\n\n${this.formatComment(
        formattedGame.comment
      )}`;
    } else {
      if (formattedGame.comment && formattedGame.comment.length > 0) {
        formattedGame.comment = this.formatComment(formattedGame.comment);
      }
    }
    if (formattedGame.rating && formattedGame.rating.toLowerCase() !== 'n/a') {
      formattedGame.rating = `${formattedGame.rating} / 10`;
    }
    return formattedGame;
  }

  private formatComment(comment: string) {
    if (comment && comment.length > 0) {
      return micromark(comment);
    }
    return '';
  }

  filterBoardGames(boardGames: BoardGame[]) {
    if (this.searchTerm.trim() !== '') {
      return boardGames.filter((boardGame) =>
        boardGame.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return boardGames.sort((book1, book2) => (book1.name > book2.name ? 1 : -1));
  }

  public scrollToSection(section: string) {
    const element = this.sectionMap[section];
    if (element) {
      const yOffset = -this.scrollTitleOffset;
      const y = element.nativeElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
