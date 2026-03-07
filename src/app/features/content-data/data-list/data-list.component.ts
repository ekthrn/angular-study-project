import {
  Component,
  OnInit, OnDestroy
} from '@angular/core';
import {NgFor, NgTemplateOutlet} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';

import {FilterService} from "@services/filter.service";

import {SettingPanelComponent} from '@features/content-data/setting-panel/setting-panel.component';
import {BookCardComponent} from '@features/content-data/data-card/data-card.component';
import {Book} from "@models/book.model";

@Component({
  selector: 'app-data-list',
  imports: [
    NgFor,
    NgTemplateOutlet,
    SettingPanelComponent,
    BookCardComponent
  ],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.scss'
})
export class BooksListComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject<void>();

  public books: Book[] = [];

  constructor(
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.filterService.filteredData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filteredBooks => {
        this.books = filteredBooks;
      });

    this.filterService.myState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(myState$ => {
        console.log(myState$);
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackByCard(index: number, item: Book): number {
    return item ? item.id : index;
  }
}
