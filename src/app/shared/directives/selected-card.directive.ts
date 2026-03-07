import {
  Input, Output, EventEmitter,
  Directive,
  HostListener, HostBinding
} from '@angular/core';

import {FilterService} from "@services/filter.service";
import {Book} from "@models/book.model";

@Directive({
  selector: '[appSelectedCard]'
})
export class SelectedCardDirective {
  @Input('appSelectedCard') book!: Book;

  constructor(private filterService: FilterService) {}

  @HostBinding('class.selected') isSelected: boolean = false;

  @HostListener('click')
  onClick() {
    this.isSelected = !this.isSelected;
    this.filterService.setSelectedItem(this.book, this.isSelected);
  }
}
