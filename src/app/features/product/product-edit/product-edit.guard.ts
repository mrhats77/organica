import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanActivate, CanDeactivate<unknown> {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(component: ProductEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.productForm.dirty) {
      const productName = component.productForm.get('productName')?.value || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName}?`);
    }
    return true;
  }
  
}
