import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

/**  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const token = this.authService.getAccessToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }**/
      intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
    //    console.log(event);
          const authorizationHeader = event.headers.get('Authorization');
      //    console.log(authorizationHeader)
          if (authorizationHeader) {
            const token = authorizationHeader;
            // Extrae el token
     //       console.log(token)
            // Almacena el token en tu servicio AuthService
  //          this.authService.setToken(token);
          }
        }
      })
    );
  }
}

