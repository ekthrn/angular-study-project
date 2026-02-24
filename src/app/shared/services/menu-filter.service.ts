import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuFilterService {
  private selectedSource = new BehaviorSubject<string | null>(null);
  selectedItem$: Observable<string | null> = this.selectedSource.asObservable();

  public setItem(item: string) {
    this.selectedSource.next(item);
  }
}
