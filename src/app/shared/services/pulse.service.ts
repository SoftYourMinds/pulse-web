import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPulse, ISettings } from '../interfaces';
import { API_URL } from '../tokens/tokens';

@Injectable({
    providedIn: 'root',
})
export class PulseService {
    public appStoreUrl: string;
    public blobUrlPrefix: string;
    public googlePlayUrl: string;
    public minVoteInterval: number;
    public latestAppVersionNumber: number;

    private readonly apiUrl: string = inject(API_URL);
    private readonly http: HttpClient = inject(HttpClient);

    public get(
        params: {
            keyword?: string;
            country?: string;
            state?: string;
            city?: string;
        } = {}
    ): Observable<IPulse[]> {
        let paramUrl = '';

        const keys = Object.keys(params) as Array<keyof typeof params>;

        keys.forEach((param, index) => {
            if (params[param]) {
                const separator = index === 0 ? '?' : '&';
                paramUrl += `${separator}${param}=${params[param]}`;
            }
        });

        return this.http.get<IPulse[]>(`${this.apiUrl}/topics` + paramUrl);
    }

    public getById(id: string | number): Observable<IPulse> {
        return this.http.get<IPulse>(`${this.apiUrl}/topics/${id}`);
    }

    public getMapVotes(
        NElatitude: number,
        NElongitude: number,
        SWlatitude: number,
        SWlongitude: number,
        resolution: number = 1,
        topicId?: number
    ): Observable<{
        [key: string]: number
    }> {
        return this.http.get<{
            [key: string]: number;
        }>(
            this.apiUrl +
                `/map/votes?NE.latitude=${NElatitude}&NE.longitude=${NElongitude}&SW.latitude=${SWlatitude}&SW.longitude=${SWlongitude}&resolution=${resolution}` +
                (topicId ? `&topicId=${topicId}` : '')
        );
    }

    public getSettings(): Observable<ISettings> {
        return this.http.get<ISettings>(`${this.apiUrl}/settings`).pipe(
            tap((settings) => {
                this.blobUrlPrefix = settings.blobUrlPrefix;
                this.minVoteInterval = settings.minVoteInterval;
                this.appStoreUrl = settings.appStoreUrl;
                this.googlePlayUrl = settings.googlePlayUrl;
            })
        );
    }

    public getH3PulsesForMap(
        NElatitude: number,
        NElongitude: number,
        SWlatitude: number,
        SWlongitude: number,
        resolution: number = 1
    ) {
        return this.http.get(
            this.apiUrl +
                `/map/top?NE.latitude=${NElatitude}&NE.longitude=${NElongitude}&SW.latitude=${SWlatitude}&SW.longitude=${SWlongitude}&resolution=${resolution}`
        );
    }
}
