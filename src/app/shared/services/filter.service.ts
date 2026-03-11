import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,
  combineLatest, map, debounceTime, distinctUntilChanged} from 'rxjs';

import {Book, FilterState, OptionSort, OptionSearch} from '@models';
import {MOCK_BOOKS} from "@mock-data/books.mock";
import {MOCK_SORT_OPTIONS} from "@mock-data/sort-options.mock";
import {MOCK_SEARCH_OPTIONS} from "@mock-data/search-options.mock";

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private readonly data: Book[] = MOCK_BOOKS;
  private readonly optionsSort: OptionSort[] = MOCK_SORT_OPTIONS;
  private readonly optionsSearch: OptionSearch[] = MOCK_SEARCH_OPTIONS;
  private state = new BehaviorSubject<FilterState>({
    optionMenu: null,
    optionSort: null,
    optionSearch: null,
    featuredItems: [],
    curHoverBook: null,
    query: ''
  });

  private optionMenu$: Observable<string | null> = this.state.pipe(map(s => s.optionMenu));
  private optionSort$: Observable<OptionSort | null>  = this.state.pipe(map(s => s.optionSort));
  private optionSearch$: Observable<OptionSearch | null>  = this.state.pipe(map(s => s.optionSearch));
  private querySearch$: Observable<string | null> = this.state.pipe(
    map(s => s.query || ''),
    debounceTime(300),
    distinctUntilChanged(),
  );

  readonly myState$: Observable<FilterState> = this.state.asObservable();
  readonly optionsSortData$: Observable<OptionSort[]> = new BehaviorSubject(this.optionsSort).asObservable();
  readonly optionsSearchData$: Observable<OptionSearch[]> = new BehaviorSubject(this.optionsSearch).asObservable();

  readonly filteredData$: Observable<Book[]> = combineLatest([
    this.optionMenu$,
    this.optionSort$,
    this.optionSearch$,
    this.querySearch$
  ]).pipe(
    map(([menu, sort, search, query]) => {
      let filteredData = [...this.data];

      if (menu) filteredData = this.updateDataMenu(menu, filteredData);
      if (sort) filteredData = this.updateDataSort(sort, filteredData);
      if (search && query) filteredData = this.updateDataSearch(search, query, filteredData);

      return filteredData;
    })
  );

  private updateDataMenu(item: string, curData: Book[]): Book[]  {
    const resData = curData.filter(el => !!el && el.genre.includes(item));
    return resData;
  }
  private updateDataSort(item: OptionSort, curData: Book[]): Book[] {
    const isAsc = item.direction === 'asc';

    return [...curData].sort((a: Book, b: Book) => {
      if (!a || !b) return 0;

      const key = item.id as keyof Book;

      const titleA = a[key] as string;
      const titleB = b[key] as string;

      return isAsc ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });
  }
  private updateDataSearch(item: OptionSearch, query: string, curData: Book[]): Book[] {
    const lQuery = query.toLowerCase().trim();
    if (!lQuery) return curData;

    return curData.filter(el => {
      if (!el) return false;

      const key = item.id as keyof Book;
      const resElement = el[key] as string;

      return resElement.includes(lQuery);
    });
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
  public setSearchParam(param: OptionSearch) {
    this.state.next({ ...this.state.value, optionSearch: param });
  }
  public setQuery(query: string) {
    this.state.next({ ...this.state.value, query: query });
  }
}
