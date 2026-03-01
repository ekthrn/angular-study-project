import { Component, Input, Output,
        EventEmitter} from '@angular/core';

import {Book} from "@models/book.model";

@Component({
  selector: 'app-book-details-dialog',
  imports: [],
  templateUrl: './book-details-dialog.component.html',
  styleUrl: './book-details-dialog.component.scss'
})
export class BookDetailsDialogComponent {
  @Input() book?: Book;
  @Output() closeEvent = new EventEmitter<boolean>();

  deleteEvent(){
    this.closeEvent.emit(true);
  }
}
