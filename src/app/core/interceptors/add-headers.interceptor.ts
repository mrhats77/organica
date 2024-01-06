import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AddHeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const clonedRequest = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

    return next.handle(clonedRequest);
  }
}