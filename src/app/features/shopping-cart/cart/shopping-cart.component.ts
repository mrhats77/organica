import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { ICartItem } from 'src/app/core/models/cart.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, CartItemComponent, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  pageTitle = 'Shopping Cart';
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;



}

  

