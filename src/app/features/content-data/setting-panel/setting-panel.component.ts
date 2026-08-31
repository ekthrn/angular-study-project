import {
  Component,
  OnInit, OnDestroy
} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';

import {OptionSort} from '@models/option.model';
import {FilterService} from '@services/filter.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-setting-panel',
  imports: [NgFor, NgIf],
  templateUrl: './setting-panel.component.html',
  styleUrl: './setting-panel.component.scss'
})
export class SettingPanelComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject<void>();

  public isHide: boolean = true;
  public options: OptionSort[] = [];
  public currentOption: string = 'name';

  constructor(
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.filterService.optionsData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(optionsData => {
        this.options = optionsData;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setFilter(id: string) {
    let myOption = this.options.find(el => !!el && el.id === id);

    if(!myOption) return;

    if (this.currentOption === id) {
      myOption.direction = (myOption.direction === 'asc') ? 'desc' : 'asc';
    } else {
      this.currentOption = id;
      myOption.direction = 'asc';
    }

    this.filterService.setSort(myOption);
  }
}
