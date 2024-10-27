import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FooterGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        if (state.url === '/map') {
            document.body.classList.add('hide-footer');
        }
        
        return true;
    }
}
