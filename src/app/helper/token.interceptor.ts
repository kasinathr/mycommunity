import { Injectable,Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication-service'; 
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authenticationService: AuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //let authService = this.injector.get(AuthenticationService);
    console.log("Interceptor called"+this.authenticationService.getJwtToken());

    /*
    let tokenizedReq = request.clone(
      {
     headers: request.headers.set('Authorization', 'bearer ' + this.authService.getJwtToken())
      //setHeaders:{
       //   Authorization:`Bearer ${authService.getJwtToken()}`
       // }
      }
    )*/
    // add authorization header with jwt token if available
    let token = this.authenticationService.getJwtToken();
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer `+token
            }
        });
      }else{
        request = request.clone({
          setHeaders: {
              Authorization:""
          }
      });
      }
    console.log("URL:"+request+"Headers:"+request.headers.get('Authorization'));
    request.headers.append('Access-Control-Allow-Methods', 'GET');
    request.headers.append('Access-Control-Allow-Origin', '*');
    request.headers.append('Content-Type', 'application/json');


    return next.handle(request)
/*
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));

        }));
        
    }*/
  
  }
}