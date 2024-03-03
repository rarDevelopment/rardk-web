import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrl: './navbar-button.component.scss',
  standalone: true,
  imports: [RouterLink, NgClass],
})
export class NavbarButtonComponent {
  @Input() urlPath: string;

  constructor(private router: Router) {}

  public isCurrentPage() {
    if (this.urlPath === '/') {
      return this.router.url === this.urlPath;
    }
    return this.router.url.startsWith(this.urlPath);
  }
}
