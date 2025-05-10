import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Define an interface for the snackbar message payload
export interface SnackbarMessage {
  message: string;
  isError: boolean;
  action?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarSubject = new Subject<SnackbarMessage>();
  public snackbarState = this.snackbarSubject.asObservable();

  constructor() {} // MatSnackBar removed

  showSnackBar(messageToDisplay: string, isError: boolean, action?: string) {
    this.snackbarSubject.next({
      message: messageToDisplay,
      isError: isError,
      action: action,
      duration: 5000, // Default duration
    });
  }
}
