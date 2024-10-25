import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError, BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private readonly REFRESH_THRESHOLD = 3 * 60 * 1000;

  constructor(private authService: AuthService) {}

  private parseJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  private isTokenExpiringSoon(token: string): boolean {
    const decodedToken: any = this.parseJwt(token);
    const expirationTime = decodedToken?.exp * 1000; // Convertir a milisegundos
    const currentTime = Date.now();

    return expirationTime - currentTime <= this.REFRESH_THRESHOLD;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let authReq = req;

    if (token && this.isTokenExpiringSoon(token)) {
      return this.handleTokenRefresh(req, next);
    }

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    // Si ya estamos intentando refrescar el token, esperamos a que finalice
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((newToken: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newToken);
          localStorage.setItem('token', newToken);

          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });

          return next.handle(authReq);
        }),
        catchError(() => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => new Error('Sesión expirada. Redirigiendo al login.'));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        switchMap((newToken) => {
          if (newToken) {
            const authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next.handle(authReq);
          }
          return throwError(() => new Error('Error al refrescar el token.'));
        })
      );
    }
  }

  private handleTokenRefresh(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let authReq = req;

    if (token && this.isTokenExpiringSoon(token)) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
        //console.log('refreshing token');

        return this.authService.refreshToken().pipe(
          switchMap((newToken: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(newToken);
            localStorage.setItem('token', newToken);

            authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });

            return next.handle(authReq);
          }),
          catchError(() => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(() => new Error('Sesión expirada. Redirigiendo al login.'));
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
          switchMap((newToken) => {
            if (newToken) {
              authReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(authReq);
            }
            return throwError(() => new Error('Error al refrescar el token.'));
          })
        );
      }
    }

    return next.handle(req);
  }
}
