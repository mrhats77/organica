import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ICartItem } from 'src/app/core/models/cart.model';
import { IProduct } from 'src/app/core/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartsUrl = 'http://localhost:3000/carts';

  private http = inject(HttpClient)
 

  // Manage state with signals
  cartItems = signal<ICartItem[]>([]);

  // Number of items in the cart
  cartCount = computed(() => this.cartItems()
    .reduce((accQty, item) => accQty + item.quantity, 0)
  );


  // If the item is already in the cart, increase the quantity
  addToCart(product: IProduct): void {
    const index = this.cartItems().findIndex(item =>
      item.product.id === product.id);
    if (index === -1) {
      // Not already in the cart, so add with default quantity of 1
      this.cartItems.update(items => [...items, { product, quantity: 1 }]);
    } else {
      // Already in the cart, so increase the quantity by 1
      this.cartItems.update(items =>
        [
          ...items.slice(0, index),
          { ...items[index], quantity: items[index].quantity + 1 },
          ...items.slice(index + 1)
        ]);
    }
  }

  
   // Update the cart quantity
  updateQuantity(cartItem: ICartItem, quantity: number): void {
    // Update the cart with a new array containing
    // the updated item and all other original items
    this.cartItems.update(items =>
      items.map(item => item.product.id === cartItem.product.id ?
        { ...item, quantity } : item));
  }
  
  // Remove the item from the cart
  removeFromCart(cartItem: ICartItem): void {
    // Update the cart with a new array containing
    // all but the filtered out deleted item
    this.cartItems.update(items =>
      items.filter(item => item.product.id !== cartItem.product.id));
  }
  

}
