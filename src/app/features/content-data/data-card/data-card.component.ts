import {Component, Input, ViewChild,
        ViewContainerRef, ComponentRef} from '@angular/core';
import {NgIf, NgTemplateOutlet} from '@angular/common';

import {BookDetailsDialogComponent} from '@features/content-data/book-details-dialog/book-details-dialog.component';

import {Book} from "@models/book.model";

@Component({
  selector: 'app-data-card',
  imports: [
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.scss'
})
export class BookCardComponent {
  @Input() book?: Book;

  @ViewChild('dialogContainer', { read: ViewContainerRef }) dialogContainer!: ViewContainerRef;

  dialogComponentRef!: ComponentRef<BookDetailsDialogComponent>;

  createDialogComponent(book: Book){
    this.dialogComponentRef = this.dialogContainer.createComponent(BookDetailsDialogComponent);
    this.dialogComponentRef.instance.book = book;

    this.dialogComponentRef.instance.closeEvent.subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.deleteDialogComponent();
      }
    });
  }

  deleteDialogComponent(){
    this.dialogContainer.clear();
    this.dialogComponentRef.destroy();
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
