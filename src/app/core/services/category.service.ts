import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesApiUrl = 'api/categories';
  private http = inject(HttpClient);


  categories$ = this.http.get<ICategory[]>(`${this.categoriesApiUrl}`)
  .pipe(
    tap(data => console.log('Category: ', JSON.stringify(data))),
    catchError(this.handleError)
  );

  

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
}
