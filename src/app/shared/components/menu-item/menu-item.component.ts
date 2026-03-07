import { Component, Input} from '@angular/core';

import {FilterService} from "@services/filter.service";

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
      private filterService: FilterService
  ) {}

  public send(item: string) {
    this.filterService.setMenu(item);
  }
}
