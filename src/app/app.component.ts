import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainContentPanelComponent } from "@features/main/main-content-panel/main-content-panel.component";
import { HeaderComponent } from "@features/main/header/header.component";
import { LeftMenuComponent } from "@features/main/left-menu/left-menu.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MainContentPanelComponent,
    HeaderComponent,
    LeftMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'study-project';
}
