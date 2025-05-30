import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { settings } from 'src/settings';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SnackbarComponent } from './components/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, RouterLink, NavbarComponent, SnackbarComponent],
})
export class AppComponent {
  public isSocialEnabled: boolean = settings.isSocialEnabled;
  public currentYear = new Date().getFullYear();
}
