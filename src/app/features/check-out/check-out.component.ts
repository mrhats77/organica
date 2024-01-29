import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getFormControlErrors } from 'src/app/shared/utilityFunctions';
import { CartService } from '../shopping-cart/cart.service';
import { ICart, ICartItem } from 'src/app/core/models/cart.model';


@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  orderForm!: FormGroup;
  shipping = {};
  

  private fb = inject(FormBuilder)
  private cartService = inject(CartService)

  items= this.cartService.cartItems;
  item = signal<ICartItem>(undefined!);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.maxLength(60)]],
      city: ['', Validators.required]
    })
  }

  placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.item.mutate( i => {
        return {
          product:{
            title:i.product.title,
            imageUrl: i.product.imageUrl,
            price: i.product.price
          },
          quantity: i.quantity,
        }
      })
      
    }
  }

  getFormControlErrors(controlName: string): boolean {
    const control = this.orderForm.get(controlName);
    return getFormControlErrors(control!);
  }


}
