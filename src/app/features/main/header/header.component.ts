import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { MenuItemComponent } from '@components/menu-item/menu-item.component';

@Component({
  selector: 'app-header',
  imports: [
    MenuItemComponent,
    NgFor
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public menuItems: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  public typeMenu: string = 'Header';
}
