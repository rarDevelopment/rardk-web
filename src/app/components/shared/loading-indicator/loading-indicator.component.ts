
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading-indicator',
    imports: [],
    templateUrl: './loading-indicator.component.html',
    styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent {
  @Input() isLoading: boolean;
}
