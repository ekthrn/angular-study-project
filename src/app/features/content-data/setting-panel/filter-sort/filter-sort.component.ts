import {
  Component,
  OnInit, OnDestroy
} from '@angular/core';
import {map, Observable, Subject, takeUntil} from 'rxjs';

import {OptionSort} from '@models/option.model';
import {FilterService} from '@services/filter.service';

@Component({
  selector: 'app-filter-sort',
  imports: [],
  templateUrl: './filter-sort.component.html',
  styleUrl: './filter-sort.component.scss'
})
export class FilterSortComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject<void>();

  public options: OptionSort[] = [];

  constructor(
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.filterService.optionsSortData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.options = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setFilter(selectedOption: OptionSort) {
    this.options = this.options.map(o => {
      if (o.id === selectedOption.id) {
        const dir = o.isSelected
          ? (o.direction === 'asc' ? 'desc' : 'asc')
          : 'asc';

        return {
          ...o,
          isSelected: true,
          direction: dir
        };
      }

      return {
        ...o,
        isSelected: false,
      };
    });

    this.filterService.setSort(selectedOption);
  }
}
