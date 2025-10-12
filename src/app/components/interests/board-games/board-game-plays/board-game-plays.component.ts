import { Component, OnInit } from '@angular/core';
import { BoardGamesService } from '../board-games.service';
import { finalize, take } from 'rxjs';
import { BoardGamePlay } from '../models/board-game-play';
import { BoardGamePlaysOnDate } from '../models/board-game-play-date';
import { PageTitleComponent } from 'src/app/components/shared/page-title/page-title.component';
import { LoadingIndicatorComponent } from 'src/app/components/shared/loading-indicator/loading-indicator.component';
import { DatePipe } from '@angular/common';
import { BoardGamePlayer } from '../models/board-game-player';

@Component({
  selector: 'app-board-game-plays',
  imports: [PageTitleComponent, LoadingIndicatorComponent, DatePipe],
  templateUrl: './board-game-plays.component.html',
  styleUrl: './board-game-plays.component.scss',
})
export class BoardGamePlaysComponent implements OnInit {
  isLoading: boolean;
  boardGamePlays: BoardGamePlaysOnDate[];
  isError: boolean;

  constructor(private boardGamesService: BoardGamesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.boardGamesService
      .getPlays()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (boardGames: BoardGamePlay[]) => {
          this.boardGamePlays = [];
          boardGames.forEach((play) => {
            const date = new Date(play.date);
            const existingPlays = this.boardGamePlays.find(
              (p) => p.date.toDateString() === date.toDateString()
            );

            if (existingPlays) {
              existingPlays.plays.push(play);
            } else {
              this.boardGamePlays.push({
                plays: [play],
                date: date,
              });
            }
          });
        },
        error: (error) => {
          this.isError = true;
          this.isLoading = false;
          console.error('Error loading plays', error);
        },
      });
  }

  public formatPlayers(players: BoardGamePlayer[]): string {
    if (players.some((p) => p.score === undefined)) {
      players = players.sort((a, b) => {
        return (a.score ?? 0) - (b.score ?? 0);
      });
    }
    const formattedPlayerText = players
      .map((p) => {
        const nameToUse = p.username || p.name || 'Unknown Player';
        const playerText = nameToUse + (p.win ? '🏆' : '') + (p.score ? ` (${p.score})` : '');
        return playerText;
      })
      .join(', ');
    return formattedPlayerText;
  }

  public formatPlayDuration(durationInMinutes: number): string {
    if (durationInMinutes < 60) {
      return `${durationInMinutes}m`;
    } else {
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes} m` : ''}`;
    }
  }
}
