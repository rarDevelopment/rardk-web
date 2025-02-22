import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
// courtesty of https://www.youtube.com/watch?v=YPOwsP9GV0w
@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('tooltip') tooltipText: string = '';
  @Input() placement?: string = 'bottom';
  @Input() delay?: number = 5;
  tooltip?: HTMLElement;
  offset = 10;

  constructor(private el: ElementRef) {}

  ngOnDestroy(): void {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = undefined;
    }
  }

  @HostListener('mouseenter', ['$event'])
  @HostListener('touchstart')
  onMouseEnter(event?: MouseEvent) {
    if (event && 'ontouchstart' in window) {
      return;
    }
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave', ['$event'])
  @HostListener('touchend')
  onMouseLeave(event?: MouseEvent) {
    if (event && 'ontouchstart' in window) {
      return;
    }
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.create();
    this.setPosition();
    this.tooltip?.classList.add('ng-tooltip-show');
  }

  hide() {
    window.setTimeout(() => {
      this.tooltip?.classList.remove('ng-tooltip-show');
      this.tooltip?.remove();
      this.tooltip = undefined;
    }, this.delay);
  }

  create() {
    if (this.tooltipText && this.tooltipText.length > 0) {
      this.tooltip = document.createElement('span');
      this.tooltip.classList.add('ng-tooltip');
      this.tooltip.textContent = this.tooltipText;
      document.body.appendChild(this.tooltip);
    }
  }

  setPosition() {
    if (!this.tooltip) {
      return;
    }
    const elemRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltip?.getBoundingClientRect()!;

    let left;
    let top;
    switch (this.placement) {
      case 'top':
        top = elemRect.top - tooltipRect.height - this.offset;
        left = elemRect.left + (elemRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = elemRect.bottom + this.offset;
        left = elemRect.left + (elemRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        left = elemRect.left - tooltipRect.width - this.offset;
        break;
      case 'right':
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        left = elemRect.right + this.offset;
        break;
      default:
        throw new Error('Placement not supported' + this.placement);
    }

    if (this.tooltip) {
      this.tooltip.style.top = `${top}px`;
      this.tooltip.style.left = `${left}px`;
    }
  }
}
