import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { CheckOutComponent } from './features/check-out/check-out.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CheckOutComponent],
  template:
    `<app-header />
  <div class="container">
    <router-outlet />
  </div>`
})
export class AppComponent {
  title = 'organica';
}
