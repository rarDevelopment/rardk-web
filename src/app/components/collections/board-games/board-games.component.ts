import { Component, OnInit } from '@angular/core';
import { BoardGamesService } from './board-games.service';
import { BoardGame } from 'src/app/models/board-game';
import { take } from 'rxjs';
import { micromark } from 'micromark';

@Component({
  selector: 'app-board-games',
  templateUrl: './board-games.component.html',
  styleUrls: ['./board-games.component.scss'],
})
export class BoardGamesComponent implements OnInit {
  constructor(private boardGamesService: BoardGamesService) {}

  public wishlistGames: BoardGame[];
  public ownedGames: BoardGame[];
  public isLoadingWishlist: boolean;
  public isLoadingOwnedList: boolean;
  public showLoadingDisclaimer: boolean;
  public showErrorMessage: boolean;

  ngOnInit() {
    this.isLoadingWishlist = true;
    this.isLoadingOwnedList = true;
    this.populateWishlist();
    this.populateOwnedList();
    setTimeout(() => {
      this.showLoadingDisclaimer = true;
    }, 5000);
  }

  public async populateWishlist() {
    this.boardGamesService
      .getWishlistGames()
      .pipe(take(1))
      .subscribe({
        next: (boardGames: BoardGame[]) => {
          this.wishlistGames = boardGames
            .sort((i) => i.priority)
            .map((g) => this.formatGameProperties(g, true));
          this.isLoadingWishlist = false;
        },
        error: (error) => {
          console.error('Error loading wishlist', error);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      });
  }

  public async populateOwnedList() {
    this.boardGamesService
      .getOwnedGames()
      .pipe(take(1))
      .subscribe({
        next: (boardGames: BoardGame[]) => {
          this.ownedGames = boardGames.map((g) =>
            this.formatGameProperties(g, false)
          );
          this.isLoadingOwnedList = false;
        },
        error: (error) => {
          console.error('Error loading owned list', error);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      });
  }

  private formatGameProperties(g: BoardGame, showPriority: boolean) {
    let formattedGame = g;
    if (showPriority) {
      formattedGame.comment = `Priority: ${
        formattedGame.priority
      }\n\n${micromark(formattedGame.comment)}`;
    } else {
      if (formattedGame.comment && formattedGame.comment.length > 0) {
        formattedGame.comment = micromark(formattedGame.comment);
      }
    }
    if (formattedGame.rating && formattedGame.rating.toLowerCase() !== 'n/a') {
      formattedGame.rating = `${formattedGame.rating} / 10`;
    }
    return formattedGame;
  }
}