import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, map, Observable, tap } from 'rxjs';
import { IPulse, ISettings } from '../../interfaces';
import { API_URL } from '../../tokens/tokens';

@Injectable({
    providedIn: 'root',
})
export class PulseService {
    public appStoreUrl: string;
    public blobUrlPrefix: string;
    public googlePlayUrl: string;
    public minVoteInterval: number;
    public latestAppVersionNumber: number;
    public currentHeatmapDepth: number = 3;
    public actualTopicsImageKeyMap: { [key: string]: string } = {};

    private readonly apiUrl: string = inject(API_URL);
    private readonly http: HttpClient = inject(HttpClient);

    constructor() {
        this.get().pipe(first()).subscribe();
    }

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

        return this.http.get<IPulse[]>(`${this.apiUrl}/topics` + paramUrl).pipe(
            tap((pulses) =>
                pulses.forEach((pulse) => {
                    console.log(pulse);
                    this.actualTopicsImageKeyMap[pulse.id] = pulse.icon;
                })
            )
        );
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
        [key: string]: number;
    }> {
        console.log('resolution', resolution);
        return this.http
            .get<Array<{ id: string; votes: number; children: any }>>(
                this.apiUrl +
                    `/map?NE.latitude=${NElatitude}&NE.longitude=${NElongitude}&SW.latitude=${SWlatitude}&SW.longitude=${SWlongitude}&resolution=${resolution}` +
                    (topicId ? `&topicId=${topicId}` : '')
            )
            .pipe(
                map((response) =>
                    response.reduce(
                        (acc, h3Cell) => ({
                            ...acc,
                            ...this.getH3CellsFromChildren(h3Cell),
                        }),
                        {}
                    )
                )
            );
    }

    private getH3CellsFromChildren = ({
        id,
        votes,
        children,
        depth = this.currentHeatmapDepth,
    }: {
        id: string;
        votes: number;
        children: any;
        depth?: number;
    }) => {
        depth = +depth;
        if (!children || depth === 1) {
            return {
                [id]: votes,
            };
        }

        return Object.assign(
            { [id]: votes },
            children.reduce(
                (acc: any, child: any) => ({
                    ...acc,
                    ...this.getH3CellsFromChildren({
                        ...child,
                        depth: depth - 1,
                    }),
                }),
                {}
            )
        );
    };

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
        if (resolution >= 8) resolution = 7;
        return this.http
            .get(
                this.apiUrl +
                    `/map?NE.latitude=${NElatitude}&NE.longitude=${NElongitude}&SW.latitude=${SWlatitude}&SW.longitude=${SWlongitude}&resolution=${resolution}`
            )
            .pipe(
                map((response: any) => {
                    const objH3Pulses = {};
                    response.forEach(
                        (res: { id: string; topics: any; votes: number }) => {
                            const maxVotesOfTopicId = Object.entries(res.topics)
                                .sort((a: any, b: any) => a[1] - b[1])
                                .pop()![0];

                            // @ts-ignore
                            objH3Pulses[res.id] = {
                                topicId: maxVotesOfTopicId,
                                icon: this.actualTopicsImageKeyMap[
                                    maxVotesOfTopicId
                                ],
                                votes: res.votes,
                            };
                        }
                    );
                    return objH3Pulses;
                })
            );
    }
}
