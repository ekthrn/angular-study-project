import {
  Component,
  OnInit, OnDestroy
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';

import {OptionSearch} from '@models/option.model';
import {FilterService} from '@services/filter.service';

@Component({
  selector: 'app-filter-search',
  imports: [],
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.scss'
})
export class FilterSearchComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject<void>();

  public options: OptionSearch[] = [];
  public curLabel: string = '';

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.optionsSearchData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.options = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setFilter(selectedOption: OptionSearch) {
    this.options = this.options.map(o => {
      if (o.id === selectedOption.id) {
        return {
          ...o,
          isSelected: true,
        };
      }else {
        return {
          ...o,
          isSelected: false,
        };
      }
    });

    this.curLabel = selectedOption.label;
    this.filterService.setSearchParam(selectedOption);
  }
  public setSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterService.setQuery(value);
  }
}
