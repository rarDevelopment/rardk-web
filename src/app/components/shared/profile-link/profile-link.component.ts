import { Component, Input } from '@angular/core';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';

@Component({
    selector: 'app-profile-link',
    templateUrl: './profile-link.component.html',
    styleUrls: ['./profile-link.component.scss'],
    imports: [TooltipDirective]
})
export class ProfileLinkComponent {
  @Input() url: string;
  @Input() name: string;
}
