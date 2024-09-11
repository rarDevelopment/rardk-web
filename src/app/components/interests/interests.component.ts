import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
  standalone: true,
  imports: [PageTitleComponent, RouterLink],
})
export class InterestsComponent {}
