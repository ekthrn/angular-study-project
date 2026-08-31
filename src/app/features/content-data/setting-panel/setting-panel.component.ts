import {Component} from '@angular/core';

import {FilterSortComponent} from './filter-sort/filter-sort.component';
import {FilterSearchComponent} from './filter-search/filter-search.component';

@Component({
  selector: 'app-setting-panel',
  imports: [FilterSortComponent, FilterSearchComponent],
  templateUrl: './setting-panel.component.html',
  styleUrl: './setting-panel.component.scss'
})
export class SettingPanelComponent {
  public isHide: boolean = true;
}
