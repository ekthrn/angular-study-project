import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';

import {Book, FilterState, OptionSort} from '@models';
import {MOCK_BOOKS} from "@mock-data/books.mock";
import {MOCK_PANEL_OPTIONS} from "@mock-data/options-panel.mock";

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private readonly data: Book[] = MOCK_BOOKS;
  private readonly options: OptionSort[] = MOCK_PANEL_OPTIONS;
  private state = new BehaviorSubject<FilterState>({
    optionMenu: null,
    optionSort: null,
    featuredItems: [],
    curHoverBook: null,
  });

  readonly myState$: Observable<FilterState> = this.state.pipe();

  readonly optionsData$: Observable<OptionSort[]> = this.state.pipe(
    map(() => {
      let optionsData: OptionSort[] = this.options;
      return optionsData;
    })
  );

  readonly filteredData$: Observable<Book[]> = this.state.pipe(
    map(state => {
      let filteredData: Book[] = this.data;

      if(state.optionMenu) filteredData = this.updateDataMenu(state.optionMenu, filteredData);

      if(state.optionSort) filteredData = this.updateDataSort(state.optionSort, filteredData);

      return filteredData;
    })
  );

  private updateDataMenu(item: string, curData: Book[]): Book[]  {
    let resData = curData.filter(el => !!el && el.genre.includes(item));
    return resData;
  }
  private updateDataSort(item: OptionSort, curData: Book[]): Book[] {
    let resData = curData;
    switch(item.id){
      case 'name':
        const isAsc = item.direction === 'asc';

        resData = [...curData].sort((a: Book, b: Book) => {
          if (!a || !b) return 0;

          const titleA = a.title;
          const titleB = b.title;

          return isAsc ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        });
        break;
    }
    return resData;
  }

  public setMenu(item: string | null) {
    this.state.next({ ...this.state.value, optionMenu: item });
  }
  public setSort(item: OptionSort | null) {
    this.state.next({ ...this.state.value, optionSort: item });
  }
  public setSelectedItem(book: Book | null, state: boolean) {
    let dataBooks: Book[] = [];
    let currentState = this.state.getValue();

    if(state) {
        dataBooks = [...currentState.featuredItems, book].filter(item => item);
    } else {
        dataBooks = currentState.featuredItems.filter((item) => item !== book);
    }

    this.state.next({ ...this.state.value, featuredItems: dataBooks });
  }
  public setHoverItem(book: Book | null, state: boolean) {
    let currentBook: Book = null
    if(state) currentBook = book;

    this.state.next({ ...this.state.value, curHoverBook: currentBook });
  }
}
