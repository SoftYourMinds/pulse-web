import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FooterCleanupGuard implements CanDeactivate<unknown> {
    canDeactivate(
    ): Observable<boolean> | Promise<boolean> | boolean {
        document.body.classList.remove('hide-footer'); 
        return true;
    }
}