import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateDisplayComponent } from '../date-display/date-display.component';
import { ModalImage } from 'src/app/components/shared/modal/models/modal-image';

@Component({
  selector: 'app-modal',
  imports: [DateDisplayComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isVisible: boolean;
  @Input() post: ModalImage;
  @Input() postUrl?: string;

  @Output() onClose = new EventEmitter<string>();

  public imageIndex: number = 0;

  public allowedClassesForClosing = ['modal', 'close', 'closing-x'];

  public isDirectionEnabled(newIndex: number): boolean {
    return typeof this.post.images[newIndex] !== 'undefined';
  }

  public changeImage(newIndex: number) {
    if (this.isDirectionEnabled(newIndex)) {
      this.imageIndex = newIndex;
    }
  }

  public close($event: MouseEvent) {
    const clickedElement = $event.target as Element;
    if (clickedElement && this.isAllowedClassForClosing(clickedElement.className)) {
      this.onClose.emit();
      this.imageIndex = 0;
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
