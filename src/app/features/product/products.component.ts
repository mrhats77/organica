import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule,  } from '@angular/common';
import {  ProductService } from './product.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, EMPTY, Subject, catchError, combineLatest, filter, map } from 'rxjs';
import { IProduct } from 'src/app/core/models/product';
import { CategoryfilterComponent } from 'src/app/core/components/categoryfilter/categoryfilter.component';
import { ProductsCatalogComponent } from 'src/app/core/components/products-catalog/products-catalog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, ProductsCatalogComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  selectedCategory: string = '';
  
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);


  productsService = this.productService.productsWithCategory$;

  selectedProduct$ = this.productService.selectedProduct$;
  
 
  pageTitle = 'Product List';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private categorySelectedSubject = new BehaviorSubject<string>('');
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();
  
  ngOnInit(): void {
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      this.selectedCategory = storedCategory;
      this.categorySelectedSubject.next(storedCategory);
    }
  }

  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.categorySelectedAction$
  ])
    .pipe(
      map(([products, selectedCategoryName]) =>
        products.filter(product =>
          selectedCategoryName ? product.category === selectedCategoryName : true
        )),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  categories$ = this.categoryService.categories$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  vm$ = combineLatest([
    this.products$,
    this.categories$
  ])
    .pipe(
      map(([products, categories]) =>
        ({ products, categories }))
    );

    onSelected(categoryName: string): void {
      this.selectedCategory = categoryName;
      this.categorySelectedSubject.next(categoryName);
      localStorage.setItem('selectedCategory', categoryName);
    }

  }