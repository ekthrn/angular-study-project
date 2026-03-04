import { Component, Input, Output,
        EventEmitter,
        HostListener
} from '@angular/core';

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

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.deleteEvent();
  }

  deleteEvent(){
    this.closeEvent.emit(true);
  }
}
