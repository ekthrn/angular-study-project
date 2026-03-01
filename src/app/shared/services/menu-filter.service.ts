import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import { OptionSort } from '@models/option.model';

@Injectable({
  providedIn: 'root',
})
export class MenuFilterService {
  private menuSource = new BehaviorSubject<string | null>(null);
  menuItem$: Observable<string | null> = this.menuSource.asObservable();

  private sortSource = new BehaviorSubject<OptionSort | null>(null);
  sortOption$ = this.sortSource.asObservable();

  public setMenuItem(item: string) {
    this.menuSource.next(item);
  }
  public setSortOption(item: OptionSort) {
    this.sortSource.next(item);
  }
}
