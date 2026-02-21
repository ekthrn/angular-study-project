import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { MenuItemComponent } from "@components/menu-item/menu-item.component";

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
  public menuItems: string[] = ['Item 1', 'Item 2', 'Item 3'];
  public typeMenu: string = 'Left menu';
}
