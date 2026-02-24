import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { MenuItemComponent } from "@components/menu-item/menu-item.component";
import {MOCK_BOOKS} from "@mock-data/books.mock";

@Component({
  selector: 'app-left-menu',
  imports: [
    MenuItemComponent,
    NgFor
  ],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {
  public menuItems: string[] = [
    ...new Set(MOCK_BOOKS.filter(el => !!el).flatMap(el => el.genre))
  ];
  public typeMenu: string = 'Категории';

  public trackByFn(index: number, item: string): string {
    return item;
  }
}
