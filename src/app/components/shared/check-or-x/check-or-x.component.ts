import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-check-or-x',
  templateUrl: './check-or-x.component.html',
  styleUrls: ['./check-or-x.component.scss'],
  standalone: true,
  imports: [],
})
export class CheckOrXComponent {
  @Input() isCheck: boolean;
}
