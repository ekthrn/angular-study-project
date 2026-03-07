import { Component } from '@angular/core';

import {BooksListComponent} from '@features/content-data/data-list/data-list.component';

@Component({
  selector: 'app-main-content-panel',
  imports: [BooksListComponent],
  templateUrl: './main-content-panel.component.html',
  styleUrl: './main-content-panel.component.scss'
})
export class MainContentPanelComponent {

}
