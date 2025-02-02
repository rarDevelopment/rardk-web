import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateDisplayComponent } from '../date-display/date-display.component';
import { ModalImage } from 'src/app/components/shared/modal/models/modal-image';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-modal',
  imports: [DateDisplayComponent, LoadingIndicatorComponent],
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
  public isLoading: boolean = false;

  public isDirectionEnabled(newIndex: number): boolean {
    return typeof this.post.images[newIndex] !== 'undefined';
  }

  public changeImage(newIndex: number) {
    if (this.isDirectionEnabled(newIndex)) {
      this.isLoading = true;
      const newImage = new Image();
      newImage.src = this.post.images[newIndex].url;
      newImage.onload = () => {
        this.imageIndex = newIndex;
        this.isLoading = false;
      };
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
