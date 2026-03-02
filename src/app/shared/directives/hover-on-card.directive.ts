import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appHoverOnCard]'
})
export class HoverOnCardDirective {
  constructor(
    private element: ElementRef,
    private renderer2: Renderer2
  ) {
    this.renderer2.setStyle(this.element.nativeElement, "cursor", "pointer");
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.hoverStyles(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hoverStyles(false);
  }

  private hoverStyles(isHover: boolean) {
    let card: HTMLElement = this.element.nativeElement;

    this.updateElementClass(card, isHover, 'shadow-l', 'shadow-sm');
    this.updateElementClass(card, isHover, 'border-rose-100', 'border-slate-200');

    let imgDiv: HTMLElement | null = card.querySelector('.img-card');
    if (imgDiv) {
      this.updateElementClass(imgDiv, isHover, 'bg-rose-50', 'bg-slate-100');
    }

    let title: HTMLElement | null = card.querySelector('.text-2xl');
    if (title) {
      this.updateElementClass(title, isHover, 'text-rose-900', 'text-slate-700');
    }
  }

  private updateElementClass(el: HTMLElement, isAdd: boolean, addClass: string, removeClass: string) {
    if (isAdd) {
      this.renderer2.addClass(el, addClass);
      this.renderer2.removeClass(el, removeClass);
    } else {
      this.renderer2.removeClass(el, addClass);
      this.renderer2.addClass(el, removeClass);
    }
  }
}
