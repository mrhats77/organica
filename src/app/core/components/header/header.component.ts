import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/features/shopping-cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgbDropdownModule,
    RouterLinkActive,
    RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuCollapsed = true;

  private cartService = inject(CartService);

  cartCount = this.cartService.cartCount;

  onLogout() {
    throw new Error('Method not implemented.');
  }
}
