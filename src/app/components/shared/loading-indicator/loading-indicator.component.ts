import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss',
})
export class LoadingIndicatorComponent {
  @Input() isLoading: boolean;
}
