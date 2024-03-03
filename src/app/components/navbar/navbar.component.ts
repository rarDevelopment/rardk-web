import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NavbarButtonComponent } from './navbar-button/navbar-button.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [NavbarButtonComponent, NgIf],
})
export class NavbarComponent {}
