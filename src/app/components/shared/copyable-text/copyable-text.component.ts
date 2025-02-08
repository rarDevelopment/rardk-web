import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-copyable-text',
  imports: [],
  templateUrl: './copyable-text.component.html',
  styleUrl: './copyable-text.component.scss',
})
export class CopyableTextComponent {
  @Input() textToCopy: string;

  constructor(public snackbar: MatSnackBar, private clipboard: Clipboard) {}

  public copyText() {
    this.clipboard.copy(this.textToCopy);
    this.showSnackBar('Copied to clipboard!', false);
  }

  // TODO: Move this to a shared component of some sort
  showSnackBar(messageToDisplay: string, isError: boolean, action?: string) {
    this.snackbar.open(messageToDisplay, action, {
      duration: 5000,
      horizontalPosition: 'center',
      panelClass: isError ? 'snackbar-error' : 'snackbar-success',
    } as MatSnackBarConfig<any>);
  }
}
