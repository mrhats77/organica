import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, combineLatest, map, merge, of, scan, shareReplay, switchMap, take, tap, throwError,  } from 'rxjs';
import { IProduct } from 'src/app/core/models/product';
import { CategoryService } from 'src/app/core/services/category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  products!: IProduct[];
  private http = inject(HttpClient)
  private categoryService = inject(CategoryService);
 
  
  products$ = this.http.get<IProduct[]>(this.productsUrl)
    .pipe(
      tap(data => console.log('Products: ', JSON.stringify(data))),
      catchError(this.handleError)
    );

  productsWithCategory$ = combineLatest([
    this.products$,
    this.categoryService.categories$
  ]).pipe(
    map(([products, categories]) =>
      products.map(product => ({
        ...product,
        price: product.price ? product.price * 1.5 : 0,
        category: categories.find(c => product.categoryId === c.id)?.name,
        searchKey: [product.productName]
      } as IProduct))
    ),
    // shareReplay(1),
  );

  private productSelectedSubject = new BehaviorSubject<number>(0);
  productSelectedAction$ = this.productSelectedSubject.asObservable();

  selectedProduct$ = combineLatest([
    this.productsWithCategory$,
    this.productSelectedAction$
  ]).pipe(
    map(([products, selectedProductId]) =>
      products.find(product => product.id === selectedProductId)
    ),
    // shareReplay(1),
    tap(product => console.log('selectedProduct', product))
  );

 

  private productInsertedSubject = new Subject<IProduct>();
  productInsertedAction$ = this.productInsertedSubject.asObservable();

  productsWithAdd$ = merge(
    this.productsWithCategory$,
    this.productInsertedAction$
  ).pipe(
    scan((acc, value) =>
      (value instanceof Array) ? [...value] : [...acc, value], [] as IProduct[])
  )
    
    getProduct(id: number): Observable<IProduct> {
      if (id === 0) {
        return of(this.initializeProduct());
      }
      const url = `${this.productsUrl}/${id}`;
      return this.http.get<IProduct>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        // catchError(this.handleError)
        );
      }
      
      createProduct(product: IProduct): Observable<IProduct> {
        product.id = null;
      
        return this.categoryService.categories$.pipe(
          take(1),
          switchMap(categories => {
            const category = categories.find(c => c.name === product.category);
            if (category) {
              product.categoryId = category.id;
            }
      
            return this.http.post<IProduct>(this.productsUrl, product);
          }),
          tap(data => {
            console.log('createProduct: ' + JSON.stringify(data));
            this.productInsertedSubject.next(data);
          }),
          catchError(this.handleError)
        );
      }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.productsUrl}/${product.id}`, product )
      .pipe(
        tap(() => {
        console.log('updateProduct: ' + product.id);
        this.productInsertedSubject.next(product);
      }),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    return this.http.delete<IProduct>(`${this.productsUrl}/${id}`)
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        // catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }




  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
      id: 0,
      title: '',
      imageUrl: ''
    };
  }
}


