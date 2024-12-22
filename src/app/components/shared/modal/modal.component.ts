
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateDisplayComponent } from '../date-display/date-display.component';
import { ModalImage } from 'src/app/components/shared/modal/models/modal-image';

@Component({
    selector: 'app-modal',
    imports: [DateDisplayComponent],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isVisible: boolean;
  @Input() post: ModalImage;

  @Output() onClose = new EventEmitter<string>();

  public imgIndex: number = 0;
  public allowedClassesForClosing = ['modal', 'close', 'closing-x'];

  public isDirectionEnabled(newIndex: number): boolean {
    return typeof this.post.images[newIndex] !== 'undefined';
  }

  public changeImage(newIndex: number) {
    if (this.isDirectionEnabled(newIndex)) {
      this.imgIndex = newIndex;
    }
  }

  public close($event: MouseEvent) {
    const clickedElement = $event.target as Element;
    if (clickedElement && this.isAllowedClassForClosing(clickedElement.className)) {
      this.onClose.emit();
      this.imgIndex = 0;
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
