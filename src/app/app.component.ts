import { Component } from '@angular/core';
import { settings } from 'src/settings';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  public isSocialEnabled: boolean = settings.isSocialEnabled;
  public currentYear = new Date().getFullYear();
}
