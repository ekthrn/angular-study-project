import {
  Directive,
  HostListener,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[appSelectedCard]'
})
export class SelectedCardDirective {
  @HostBinding('class.selected') isSelected: boolean = false;

  @HostListener('click')
  onClick() {
    this.isSelected = !this.isSelected;
  }
}
