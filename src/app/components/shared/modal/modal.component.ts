import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PixelfedPost } from 'src/app/models/pixelfed/pixelfed-post';
import { DateDisplayComponent } from '../date-display/date-display.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DateDisplayComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isVisible: boolean;
  @Output() onClose = new EventEmitter<string>();
  @Input() post: PixelfedPost;
  public imgIndex: number = 0;

  public allowedClassesForClosing = ['modal', 'close', 'closing-x'];

  public isDirectionEnabled(direction: number): boolean {
    return typeof this.post.media_attachments[this.imgIndex + direction] !== 'undefined';
  }

  public changeImage(direction: number) {
    if (this.isDirectionEnabled(direction)) {
      this.imgIndex += direction;
    }
  }

  public close($event: MouseEvent) {
    const clickedElement = $event.target as Element;
    if (clickedElement && this.isAllowedClassForClosing(clickedElement.className)) {
      this.onClose.emit();
    }
  }

  private isAllowedClassForClosing(className: string): boolean {
    const classNames = className.split(' ');
    let isAllowed = false;
    classNames.forEach((c) => {
      if (this.allowedClassesForClosing.includes(c.toLowerCase())) {
        isAllowed = true;
      }
    });
    return isAllowed;
  }
}
