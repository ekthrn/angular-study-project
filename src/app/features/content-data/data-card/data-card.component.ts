import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

import {Book} from "@models/book.model";

@Component({
  selector: 'app-data-card',
  imports: [
    NgIf
  ],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.scss'
})
export class BookCardComponent {
  @Input() book?: Book;
}
