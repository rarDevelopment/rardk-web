import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../shared/page-title/page-title.component';

@Component({
    selector: 'app-feeds',
    imports: [PageTitleComponent, RouterLink],
    templateUrl: './feeds.component.html',
    styleUrl: './feeds.component.scss'
})
export class FeedsComponent {}
