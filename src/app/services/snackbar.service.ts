import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  showSnackBar(messageToDisplay: string, isError: boolean, action?: string) {
    this.snackbar.open(messageToDisplay, action, {
      duration: 5000,
      horizontalPosition: 'center',
      panelClass: isError ? 'snackbar-error' : 'snackbar-success',
    } as MatSnackBarConfig<any>);
  }
}
