import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product';
import { ProductService } from 'src/app/features/product/product.service';
import { CartService } from 'src/app/features/shopping-cart/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit {
  @Input('product') product!: IProduct;
  originalProducts: IProduct[] = [];
  products: IProduct[] = [];
  errorMessage!: '';
  addedProductId: number | null = null;

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  cartCount = this.cartService.cartCount;

  ngOnInit(): void {
    this.productService.products$.subscribe({
      next: products => {
        this.originalProducts = products;
        this.products = [...this.originalProducts];
      },
      error: err => this.errorMessage = err
    });
  }


  addToCart() {
    this.addedProductId = this.product.id;
    this.cartService.addToCart(this.product);
   
  }
}
