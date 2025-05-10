import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-copyable-text',
  imports: [],
  templateUrl: './copyable-text.component.html',
  styleUrl: './copyable-text.component.scss',
})
export class CopyableTextComponent {
  @Input() textToCopy: string;

  constructor(private snackbarService: SnackbarService, private clipboard: Clipboard) {}

  public copyText() {
    this.clipboard.copy(this.textToCopy);
    this.snackbarService.showSnackBar('Copied to clipboard!', false);
  }
}
