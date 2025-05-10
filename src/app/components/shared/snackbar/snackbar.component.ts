import { Component, OnInit } from '@angular/core';
import { SnackbarMessage, SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent implements OnInit {
  public message: string = '';
  public duration: number = 5000;
  public type: 'success' | 'error';
  public isVisible: boolean = false;

  public typeClassMap = {
    success: 'snackbar-success',
    error: 'snackbar-error',
  };

  constructor(private snackbarService: SnackbarService) {} // Inject your updated service

  ngOnInit(): void {
    this.snackbarService.snackbarState.subscribe((state: SnackbarMessage) => {
      this.message = state.message;
      this.type = state.isError ? 'error' : 'success';
      this.isVisible = true;

      if (state.duration) {
        setTimeout(() => this.dismiss(), state.duration);
      }
    });
  }

  dismiss() {
    this.isVisible = false;
  }
}
