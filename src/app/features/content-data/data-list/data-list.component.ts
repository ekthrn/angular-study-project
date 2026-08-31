import {Component, OnInit} from '@angular/core';
import {NgFor, NgTemplateOutlet} from '@angular/common';

import {MenuFilterService} from "@services/menu-filter.service";

import {SettingPanelComponent} from '@features/content-data/setting-panel/setting-panel.component';
import {BookCardComponent} from '@features/content-data/data-card/data-card.component';
import {Book} from "@models/book.model";
import {MOCK_BOOKS} from "@mock-data/books.mock";

@Component({
  selector: 'app-data-list',
  imports: [
    NgFor,
    NgTemplateOutlet,
    SettingPanelComponent,
    BookCardComponent
  ],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.scss'
})
export class BooksListComponent implements OnInit {
  public books: Book[] = [];

  constructor(
    private filterService: MenuFilterService
  ) {}

  ngOnInit() {
    this.filterService.menuItem$.subscribe(genre => {
      this.books = (genre === null) ? MOCK_BOOKS : MOCK_BOOKS.filter(el => !!el && el.genre.includes(genre));
    });

    this.filterService.sortOption$.subscribe(option => {
      if(option){
        switch(option.id){
          case 'name':
            const bookField = 'title' as keyof Book;
            const isAsc = option.direction === 'asc';

            this.books = [...this.books].sort((a: Book, b: Book) => {
              if (!a || !b) return 0;

              const titleA = a.title;
              const titleB = b.title;

              return isAsc ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
            });
            break;
        }
      } else {
        this.books = MOCK_BOOKS;
      }
    });
  }

  public trackByCard(index: number, item: Book): number {
    return item ? item.id : index;
  }
}
