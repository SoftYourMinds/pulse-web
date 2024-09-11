import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
// import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> =
        new BehaviorSubject<any>(null);

    constructor (
        private authenticationService: AuthenticationService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') == null) return next.handle(req);
        let authReq = req;
        let token = this.authenticationService.isAuthenticatedUserValue;

        if (token != null) {
            authReq = this.addTokenHeader(req);
        }

        return next.handle(authReq).pipe(
            catchError((error) => {
                if (error.status === 504) {
                    // this.snackBar.open(
                    //     'To use this admin panel fully, please, check your connection and try again.',
                    //     'Close',
                    //     {
                    //         duration: 5000,
                    //         horizontalPosition: 'center',
                    //         verticalPosition: 'top',
                    //     }
                    // );

                    return throwError(() => error);
                } else if (
                    error instanceof HttpErrorResponse &&
                    (error.status === 401 ||
                        error?.error?.error == 'unauthorized_client')
                ) {
                    // this.snackBar.open('Getting new token', 'Close', {
                    //     duration: 2500,
                    //     horizontalPosition: 'center',
                    //     verticalPosition: 'bottom',
                    // });

                    return this.handle401Error(authReq, next);
                }
                return throwError(() => error);
            })
        );
    }

    private handle401Error(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authenticationService.loginAsAnonymous().pipe(
                switchMap((response: any) => {
                    console.log(
                        'this.authenticationService.loginAsAnonymous',
                        response
                    );
                    localStorage.setItem(
                        'token',
                        'Bearer ' + response.idToken
                    );
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(response.idToken);

                    return next.handle(this.addTokenHeader(request));
                }),
                catchError((err) => {
                    // this.snackBar.open('You need to login', 'Close', {
                    //     duration: 3500,
                    //     horizontalPosition: 'center',
                    //     verticalPosition: 'bottom',
                    // });
                    this.isRefreshing = false;
                    console.log('log out');
                    this.authenticationService.logout();
                    location.reload();
                    return throwError(() => err);
                })
            );
        }
        return this.refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>) {
        const authToken =
            this.authenticationService.isAuthenticatedUserValue;
            
        // const googleApi = request.url.startsWith(
        //     'https://maps.googleapis.com/maps/api'
        // );

        if (authToken) { // && !googleApi
            return (
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
            );
        } else {
            return request;
        }
    }
}
