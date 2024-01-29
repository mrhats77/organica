import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template:
    `<app-header />
  <div class="container">
    <router-outlet />
  </div>`
})
export class AppComponent {
  title = 'organica';
}
