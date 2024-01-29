import { IProduct } from "./product";

export interface ICart {
  cartItems: ICartItem[]
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
    dateCreated?: string | undefined; // Add this line
  }