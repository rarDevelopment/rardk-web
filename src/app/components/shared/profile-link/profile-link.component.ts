import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-profile-link',
  templateUrl: './profile-link.component.html',
  styleUrls: ['./profile-link.component.scss'],
  standalone: true,
  imports: [MatTooltipModule],
})
export class ProfileLinkComponent {
  @Input() url: string;
  @Input() name: string;
}
