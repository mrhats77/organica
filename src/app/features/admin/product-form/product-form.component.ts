import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe, NgFor],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  
  private category = inject(CategoryService);
  private fb = inject(FormBuilder);
  
  categories$ = this.category.categories$;
  
  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['',[Validators.required]],
      price: [,[Validators.required]],
      category: ['',[Validators.required]],
      imageUrl: ['',Validators.required]
    })
  }
  
  onsave() {
    console.log(this.productForm);
    console.log('Saved: ' + JSON.stringify(this.productForm.value));
  }
}

