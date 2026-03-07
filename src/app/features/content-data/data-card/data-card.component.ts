import {Component,
  Input,
  OnInit, OnDestroy,
  ViewChild, ViewContainerRef} from '@angular/core';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';

import {BookDetailsDialogComponent} from '@features/content-data/book-details-dialog/book-details-dialog.component';

import {DialogService} from "@services/dialog.service";

import {IfHighRatingDirective} from "@directives/if-high-rating.directive";
import {HoverOnCardDirective} from "@directives/hover-on-card.directive";
import {SelectedCardDirective} from "@directives/selected-card.directive";
import {Book} from "@models/book.model";

@Component({
  selector: 'app-data-card',
  imports: [
    NgIf, NgTemplateOutlet,
    IfHighRatingDirective, HoverOnCardDirective, SelectedCardDirective
  ],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.scss'
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input() book?: Book;
  @ViewChild('dialogContainer', { read: ViewContainerRef }) dialogContainer!: ViewContainerRef;

  private destroy$ = new Subject<void>();

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.dialogService.dataDialog$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dataDialog => {
        if (dataDialog.isOpened && dataDialog.dataBook?.id === this.book?.id) {
          this.renderDialog(dataDialog.dataBook);
        } else {
          this.dialogContainer?.clear();
        }
        console.log(dataDialog);
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private renderDialog(book: Book) {
    this.dialogContainer.clear();
    const ref = this.dialogContainer.createComponent(BookDetailsDialogComponent);
    ref.instance.book = book;
  }
  openDialog(book: Book) {
    if (book) {
      this.dialogService.setDataBook(book);
      this.dialogService.setOpen(true);
    }
  }
  getBriefInfo(info: string){
    const posDot = info.indexOf('.');
    let briefInfo = info;
    if(posDot !== -1){
      briefInfo = info.slice(0, posDot) + '...';
    }
    return briefInfo;
  }
}
