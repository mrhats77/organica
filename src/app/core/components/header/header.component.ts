import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgbCollapseModule,
    NgbDropdownModule,
    RouterLinkActive,
    RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuCollapsed = true;

  onLogout() {
    throw new Error('Method not implemented.');
  }
}
