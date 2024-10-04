import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, UserCredential } from 'firebase/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IFirebaseConfig } from '../../interfaces';
import { API_URL, FIREBASE_CONFIG } from '../../tokens/tokens';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    public anonymousUser: Observable<string | null>;
    public isAuthenticatedUser: Observable<string | null>;
    public defaultHeaders = new HttpHeaders();

    private anonymousUser$: BehaviorSubject<string | null>;
    private isAuthenticatedUser$: BehaviorSubject<string | null>;

    constructor (
        private readonly http: HttpClient,
        @Optional() @Inject(API_URL) private readonly apiUrl: string,
        @Inject(FIREBASE_CONFIG) private readonly firebaseConfig: IFirebaseConfig,
    ) {
        this.initFirebaseAppWithConfig();

        this.anonymousUser$ = new BehaviorSubject(
            localStorage.getItem('anonymous')
        );
        this.anonymousUser = this.anonymousUser$.asObservable();

        this.isAuthenticatedUser$ = new BehaviorSubject(
            localStorage.getItem('isAuthenticated')
        );
        this.isAuthenticatedUser =
            this.isAuthenticatedUser$.asObservable();
    }

    private initFirebaseAppWithConfig(): void {
        const app = initializeApp(this.firebaseConfig);
    } 

    public get anonymousUserValue(): string | null {
        return this.anonymousUser$.value;
    }

    public get isAuthenticatedUserValue(): string | null {
        return this.isAuthenticatedUser$.value;
    }

    public loginAsAnonymousThroughTheFirebase(): Observable<UserCredential> {
        const auth = getAuth();
        
        return from(signInAnonymously(auth)).pipe(
            catchError((error: any) => {
                console.log(error);
                throw new Error(error.message);
            }),
            map((response: UserCredential | any) => {
                const accessToken = response.user.accessToken;

                localStorage.setItem('anonymous', accessToken);
                this.anonymousUser$.next(accessToken);

                return response;
            })
        );
    }

    /**
     * @deprecated
     */
    public loginAsAnonymous(): Observable<any> {
        const generateId = () => {
            let code = Math.random().toString(36).substr(2, 9).toUpperCase();
            for (let x = 0; x < 5; x++) {
                code +=
                    '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            }
            return code;
        };

        let params = new HttpParams();
        params = params.append('grant_type', 'device_id');
        params = params.append('device_id', generateId());

        if (this.anonymousUserValue && !this.isTokenExpired) {
            return of(this.anonymousUserValue);
        }

        return this.http
            .post<any>(`${this.apiUrl}/identity/login:anonymous`, {
                body: params
            })
            .pipe(
                catchError((error: any) => {
                    console.log(error);
                    throw new Error(error.message);
                }),
                map((response: any) => {
                    localStorage.setItem(
                        'anonymous',
                        response.idToken
                    );
                    this.anonymousUser$.next(response.idToken);
                    
                    return response;
                })
            );
    }

    // login(formData): Observable<any> {
    //     let headers = this.defaultHeaders;
    //     headers = headers.append(
    //         'content-type',
    //         'application/x-www-form-urlencoded'
    //     );

    //     let params = new HttpParams();
    //     params = params.append('client_id', 'vibespot-spa-client');
    //     params = params.append('client_secret', 'vibespotsecret');
    //     params = params.append('grant_type', 'password');
    //     params = params.append('username', formData.username);
    //     params = params.append('password', formData.password);
    //     params = params.append('scopes', 'offline_access');

    //     return this.http
    //         .request<any>('post', `${this.basePathIdentity}/connect/token`, {
    //             body: params,
    //             headers,
    //             responseType: 'json',
    //             observe: 'response',
    //         })
    //         .pipe(
    //             map((response: any) => {
    //                 localStorage.setItem(
    //                     'isAuthenticated',
    //                     JSON.stringify(response.body)
    //                 );
    //                 this.isAuthenticatedUser$.next(response.body);
    //                 return response;
    //             })
    //         );
    // }

    public logout(): void {
        localStorage.removeItem('isAuthenticated');
        this.isAuthenticatedUser$.next(null);

        localStorage.removeItem('anonymous');
        this.anonymousUser$.next(null);
    }

    private get isTokenExpired(): boolean {
        const token = this.anonymousUserValue;

        if (!token) {
            return true;
        }
        
        const decodedToken = this.decodeToken(token);
        if (!decodedToken || !decodedToken.exp) {
            return true;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
    }

    private decodeToken(token: string): JwtPayload | null {
        try {
            return jwtDecode<JwtPayload>(token);
        } catch (error) {
            console.error('Invalid token or unable to decode:', error);
            return null;
        }
    }
}
