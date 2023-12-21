import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product';
import { ProductService } from 'src/app/features/product/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit {
  @Input('product') product!: IProduct;
  originalProducts: IProduct[] = [];
  products: IProduct[] = [];
  errorMessage!: '';
  private productService = inject(ProductService);
  
  ngOnInit(): void {
    this.productService.products$.subscribe({
      next: products => {
        this.originalProducts = products;
        this.products = [...this.originalProducts];
      },
      error: err => this.errorMessage = err
    });
  }

  
}
 
