import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    public set isLoading(value:boolean) {
        this.isLoading$.next(value);
    }

    public get isLoadingObservable(): Observable<boolean> {
        return this.isLoading$.asObservable()
    }
    
}