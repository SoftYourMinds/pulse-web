import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const anonymousUser = this.authenticationService.anonymousUserValue;
        const isAuthenticatedUser =
            this.authenticationService.isAuthenticatedUserValue;

        if (isAuthenticatedUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${isAuthenticatedUser}`,
                },
                withCredentials: true,
            });
        } else if (anonymousUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${anonymousUser}`,
                },
                withCredentials: false,
            });
        }

        return next.handle(request);
    }
}
