import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';

import {Book, FilterState, OptionSort} from '@models';
import {DialogState} from '@models/services/dialog-state.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private state = new BehaviorSubject<DialogState>({
    isOpened: false,
    isClosed: false,
    dataBook: null,
  });

  readonly dataDialog$: Observable<DialogState> = this.state.pipe();

  public setOpen(isOpen: boolean) {
    this.state.next({ ...this.state.value, isOpened: isOpen });
  }
  public setClose(isClose: boolean) {
    this.state.next({ ...this.state.value, isClosed: isClose });
  }
  public setDataBook(book: Book | null) {
    this.state.next({ ...this.state.value, dataBook: book });
  }
}
