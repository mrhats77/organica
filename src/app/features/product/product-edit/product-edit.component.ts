import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { getFormControlErrors } from 'src/app/shared/utilityFunctions';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from 'src/app/core/models/product';
import { ProductService } from '../product.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe, NgFor, RouterLink, NgIf],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  product!: IProduct;
  errorMessage = '';
  pageTitle = 'Product Edit';
  private sub!: Subscription;
  
  private categories = inject(CategoryService);
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private router= inject(Router);
  private route = inject(ActivatedRoute);
  
  categories$ = this.categories.categories$;

  
  
  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['',[Validators.required]],
      price: [,[Validators.required]],
      category: ['',[Validators.required]],
      imageUrl: ['',Validators.required]
    })

    this.sub = this.route.paramMap.pipe(take(1)).subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getProductDetails(id);
      }
    );
  }

  getProductDetails(productId: number): void {
    this.productService.getProduct(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.productForm.patchValue(product); // Populate the form with product data
      },
      error: (err) => (this.errorMessage = err)
    });
  }
  
 saveProduct(): void {
  if (this.productForm.valid) {
    if (this.productForm.dirty) {
      const p = { ...this.product, ...this.productForm.value };

      if (p.id === 0) {
        this.productService.createProduct(p)
          .subscribe({
            next: x => {
              console.log(x);
              return this.onSaveComplete();
            },
            error: err => this.errorMessage = err
          });
      } else {
        this.productService.updateProduct(p)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    } else {
      this.onSaveComplete();
    }
  } else {
    this.errorMessage = 'Please correct the validation errors.';
  }
}

deleteProduct(): void {
  if (this.product.id === 0) {
    // Don't delete, it was never saved.
    this.onSaveComplete();
  } else if (this.product.id) {
    if (confirm(`Do you really want to delete product: ${this.product.title}?`)) {
      this.productService.deleteProduct(this.product.id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
    }
  }
}
 
  getFormControlErrors(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return getFormControlErrors(control!);
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/admin/products']);
  }

  

}


