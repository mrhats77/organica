import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { IUser } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userApiUrl = 'http://localhost:3000/users';

  
  private http = inject(HttpClient)
  private router = inject(Router);

  private currenUserSubject = new BehaviorSubject<IUser>({} as IUser);
  currentUserAction$ = this.currenUserSubject.asObservable();

  login(data: IUser) {
    return this.http.get<IUser>(`${this.userApiUrl}?email=${data.email}&password=${data.password}`, {})
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/']);
            this.currenUserSubject.next(user);
          }
          return user;
        }),
        catchError(error => {
          // Handle errors here
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }
  
}
