import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() name: string = '';
  @Input() typeMenu: string = '';

  public alertMessage(item: string, typeMenu:string){
    alert(`Вы кликнули на ${item} в ${typeMenu}`)
  }
}
