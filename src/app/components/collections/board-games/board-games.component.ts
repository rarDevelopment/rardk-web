import { Component, OnInit } from '@angular/core';
import { BoardGamesService } from './board-games.service';
import { BoardGame } from 'src/app/components/collections/board-games/models/board-game';
import { finalize, take } from 'rxjs';
import { micromark } from 'micromark';
import { NgIf, NgFor } from '@angular/common';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { Router } from '@angular/router';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-board-games',
  templateUrl: './board-games.component.html',
  styleUrls: ['./board-games.component.scss'],
  standalone: true,
  imports: [PageTitleComponent, NgIf, LoadingIndicatorComponent, NgFor],
})
export class BoardGamesComponent implements OnInit {
  constructor(private boardGamesService: BoardGamesService, private router: Router) {}

  public wishlistGames: BoardGame[];
  public ownedGames: BoardGame[];
  public isLoadingWishlist: boolean;
  public isLoadingOwnedList: boolean;
  public isErrorWishlist: boolean;
  public isErrorOwnedList: boolean;

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
            .sort((i) => i.priority)
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
}
