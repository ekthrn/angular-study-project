import { Component, Input} from '@angular/core';

import {MenuFilterService} from "@services/menu-filter.service";

@Component({
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() name: string = '';
  @Input() typeMenu: string = '';

  constructor(
      private filterService: MenuFilterService
  ) {}

  public send(item: string) {
    this.filterService.setItem(item);
  }
}
