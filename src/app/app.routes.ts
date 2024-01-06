import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { CheckOutComponent } from "./features/check-out/check-out.component";
import { OrderSuccessComponent } from "./features/order-success/order-success.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { AdminProductsComponent } from "./features/admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./features/admin/admin-orders/admin-orders.component";
import { ShoppingCartComponent } from "./features/shopping-cart/cart/shopping-cart.component";
import { MyOrdersComponent } from "./features/my-orders/my-orders.component";
import { AdminUsersComponent } from "./features/admin/admin-users/admin-users.component";
import { ProductFormComponent } from "./features/admin/product-form/product-form.component";
import { SignupComponent } from "./features/auth/signup/signup.component";
import { ProductListComponent } from "./features/product/product-list/product-list.component";
import { ProductDetailComponent } from "./features/product/product-detail/product-detail.component";
import { ProductEditComponent } from "./features/product/product-edit/product-edit.component";
import { ProductsComponent } from "./features/product/products.component";


export const routes:Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: ProductsComponent, title: 'Products' },

    
    { path: 'shopping-cart', component: ShoppingCartComponent, title: 'Shopping Cart' },
    { path: 'check-out', component: CheckOutComponent, title: 'Check Out' },
    { path:'my/orders', component:MyOrdersComponent, title: 'My Orders'},
    { path: 'order-success', component: OrderSuccessComponent,title: 'Order Success' },
    { path: 'login', component: LoginComponent,title: 'Login' },
    { path: 'signup', component: SignupComponent, title: 'Sign Up' },
    { path: 'admin/products', component: AdminProductsComponent,title: 'Admin Products' },
    { path: 'admin/products/new', component: ProductFormComponent,title: 'New Product' },
    { path: 'products/:id', component: ProductDetailComponent, title: 'Product Detail' },
    {
        // canDeactivate: [ProductEditGuard],
        path: 'products/:id/edit',
        component: ProductEditComponent, title: 'Product Edit'
    },
    { path: 'products', component: ProductListComponent, title: 'Product List' },
    { path: 'admin/orders', component: AdminOrdersComponent, title: 'Admin Orders' },
    { path: 'admin/users', component: AdminUsersComponent, title: 'Admin Users' },
];