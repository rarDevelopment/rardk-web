import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { NavbarButtonComponent } from './navbar-button/navbar-button.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [NavbarButtonComponent, CommonModule],
})
export class NavbarComponent {
  public showNavbarOnMobile = false;

  toggleNavbar() {
    this.showNavbarOnMobile = !this.showNavbarOnMobile;
  }
}
