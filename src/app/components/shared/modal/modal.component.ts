import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ModalImage } from 'src/app/components/shared/modal/models/modal-image'; // Re-import ModalImage
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component'; // Re-import LoadingIndicatorComponent
import { DateDisplayComponent } from '../date-display/date-display.component'; // Re-import DateDisplayComponent
import { RouterLink } from '@angular/router'; // Import RouterLink

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [LoadingIndicatorComponent, DateDisplayComponent, RouterLink], // Add necessary imports back
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() modalId: string = 'defaultModalId';
  @Input() post?: ModalImage; // Optional input for image modal data
  @Input() postUrl?: string; // Optional URL for image modal footer link

  // Use a single, consistent output event name
  @Output() closeModalEvent = new EventEmitter<void>();

  public imageIndex: number = 0; // Index for image gallery
  public isLoading: boolean = false; // Loading state for images
  public allowedClassesForClosing = ['modal', 'close', 'closing-x'];

  ngOnInit(): void {
    // Initialize image if post data is provided
    if (this.post && this.post.images && this.post.images.length > this.imageIndex) {
      this.changeImage(this.imageIndex, true); // Load initial image without animation/delay if needed
    }
  }

  // Method to check if image navigation is possible
  public isDirectionEnabled(newIndex: number): boolean {
    return !!this.post && !!this.post.images && typeof this.post.images[newIndex] !== 'undefined';
  }

  // Method to change the displayed image
  public changeImage(newIndex: number, initialLoad: boolean = false) {
    if (this.isDirectionEnabled(newIndex)) {
      this.isLoading = true;
      const newImage = new Image();
      newImage.src = this.post!.images[newIndex].url;
      newImage.onload = () => {
        this.imageIndex = newIndex;
        this.isLoading = false;
      };
      newImage.onerror = () => {
        // Handle image loading error if necessary
        this.isLoading = false;
        console.error('Error loading image:', newImage.src);
      };
    }
  }

  // Method to close the modal
  public close($event: MouseEvent) {
    const clickedElement = $event.target as Element;
    if (clickedElement && this.isAllowedClassForClosing(clickedElement.className)) {
      this.closeModalEvent.emit();
      this.imageIndex = 0; // Reset image index on close
    }
  }

  // Helper to check if the clicked element should close the modal
  private isAllowedClassForClosing(className: string): boolean {
    const classNames = className.split(' ');
    return classNames.some(c => this.allowedClassesForClosing.includes(c.toLowerCase()));
  }
}
