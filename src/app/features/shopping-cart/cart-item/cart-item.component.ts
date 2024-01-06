import { Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartService } from '../cart.service';
import { ICartItem } from 'src/app/core/models/cart.model';

@Component({
  selector: 'sw-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {

  // Use a setter to set the signal 
  // when the item is passed in from the parent component
  @Input({ required: true }) set cartItem(ci: ICartItem) {
    this.item.set(ci);
  }

  private cartService = inject(CartService);

  cartCount = this.cartService.cartCount;

  item = signal<ICartItem>(undefined!);


  // Build an array of numbers from 1 to qty available
  qtyArr = computed<Number[]>(() =>
    [...Array(this.item().product.quantityInStock).keys()].map(x => x + 1));

  // Calculate the extended price
  exPrice = computed(() => this.item().quantity * (this.item().product.price || 0));

  onQuantitySelected(quantity: number): void {
    this.cartService.updateQuantity(this.item(), Number(quantity));
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.item());
  }
}
