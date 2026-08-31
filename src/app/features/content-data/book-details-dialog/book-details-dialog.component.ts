import { Component,
  OnInit, OnDestroy,
  HostListener
} from '@angular/core';

import {Book} from "@models/book.model";
import {DialogService} from "@services/dialog.service";
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-book-details-dialog',
  imports: [],
  templateUrl: './book-details-dialog.component.html',
  styleUrl: './book-details-dialog.component.scss'
})
export class BookDetailsDialogComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public book: Book = null;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeDialog();
  }

  constructor(private dialogService: DialogService,) {
  }

  ngOnInit() {
    this.dialogService.dataDialog$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dataDialog => {
        this.book = dataDialog.dataBook;
        console.log(dataDialog);
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeDialog() {
    this.dialogService.setClose(true);
    this.dialogService.setOpen(false);
  }
}
