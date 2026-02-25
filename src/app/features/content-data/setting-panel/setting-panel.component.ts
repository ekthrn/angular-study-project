import { Component } from '@angular/core';
import {NgFor, NgIf} from '@angular/common';

import {OptionSort} from '@models/option.model';
import {MenuFilterService} from '@services/menu-filter.service';

@Component({
  selector: 'app-setting-panel',
  imports: [NgFor, NgIf],
  templateUrl: './setting-panel.component.html',
  styleUrl: './setting-panel.component.scss'
})
export class SettingPanelComponent {
  public isHide: boolean = true;
  public options: OptionSort[] = [
    { id: 'name', label: 'Наименованию', direction: 'asc'},
    // { id: 'rating', label: 'Рейтингу', direction: 'asc'}
  ];
  public currentOption: string = 'name';

  constructor(
    private filterService: MenuFilterService
  ) {}

  public setFilter(id: string) {
    let myOption = this.options.find(el => !!el && el.id === id);

    if(!myOption) return;

    if (this.currentOption === id) {
      myOption.direction = (myOption.direction === 'asc') ? 'desc' : 'asc';
    } else {
      this.currentOption = id;
      myOption.direction = 'asc';
    }

    this.filterService.setSortOption(myOption);
  }
}
