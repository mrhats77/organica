import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../product/product.service';
import { IProduct } from 'src/app/core/models/product';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    FormsModule, NgbPaginationModule,
  ],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],

})
export class AdminProductsComponent implements OnInit {
  originalProducts!: IProduct[] ;
  products!: IProduct[];
  errorMessage!: '';
  totalProducts!: number;
  _listFilter = '';
  page = 1;
  sortKey: string = '';
  pageSize = 5;
  reverse: boolean = false;

  private productService = inject(ProductService);

  products$ = this.productService.products$

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.products = this.listFilter ? this.performFilter(this.listFilter) : this.originalProducts;
    localStorage.setItem('listFilter', value); // Store the filter value in localStorage
  }

  getPaginatedProducts(page: number, pageSize: number): IProduct[] {
    return this.products
      .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  }
  
  get filteredProducts(): IProduct[] {
    return this.getPaginatedProducts(this.page, this.pageSize);
  }

 ngOnInit(): void {
  this.productService.products$.subscribe({
    next: products => {
      this.originalProducts = products;
      this.products = [...this.originalProducts];
      this.totalProducts = products.length;

      const storedFilter = localStorage.getItem('listFilter'); // Get the filter value from localStorage
      if (storedFilter) {
        this.listFilter = storedFilter;
      }
    },
    error: err => this.errorMessage = err
  });
}

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.originalProducts.filter((product: IProduct) =>
      product.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  sort(key: string) {
    this.sortKey = key;
    this.reverse = !this.reverse;

    this.products.sort((a, b) =>
      a[key] === b[key] ? 0 : this.reverse ?
        (a[key] < b[key] ? 1 : -1) : (a[key] < b[key] ? -1 : 1)
    );
  }
}