import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/api/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const anonymousUser = this.authenticationService.anonymousUserValue;
        const isAuthenticatedUser =
            this.authenticationService.isAuthenticatedUserValue;
        if (
            (isAuthenticatedUser || anonymousUser) &&
            !this._isTokenExpired(anonymousUser)
        ) {
            return true;
        }

        this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }

    private _decodeToken(token: string): JwtPayload | null {
        try {
            return jwtDecode<JwtPayload>(token);
        } catch (error) {
            console.error('Invalid token or unable to decode:', error);
            return null;
        }
    }

    private _isTokenExpired(token: string | null): boolean {
        if (!token) {
            return true;
        }
        
        const decodedToken = this._decodeToken(token);
        if (!decodedToken || !decodedToken.exp) {
            return true;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
    }
}
