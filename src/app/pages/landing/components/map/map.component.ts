import { Component, DestroyRef, HostBinding, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as h3 from 'h3-js';
import mapboxgl from 'mapbox-gl';
import { first, Subject } from 'rxjs';
import { PulseService } from '../../../../shared/services/pulse.service';
import { MAPBOX_STYLE } from '../../../../shared/tokens/tokens';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
    @Input() public isPreview: boolean = false;

    @HostBinding('class.full-map')
    public get isFullMap() {
        return !this.isPreview;
    }

    public markers: any = [];
    public readonly mapboxStylesUrl: string = inject(MAPBOX_STYLE);
    public center: [number, number] = [-100.661, 37.7749];
    public heatmapData = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [-120.661, 37.7749] },
                properties: { value: 10 },
            },
        ],
    };

    public map: mapboxgl.Map;
    private readonly h3Pulses$: Subject<any> = new Subject();
    private readonly destroyed: DestroyRef = inject(DestroyRef);
    private readonly pulseService: PulseService = inject(PulseService);

    public ngOnInit(): void {
        // if (this.isPreview) {}

        this.h3Pulses$
            .pipe(takeUntilDestroyed(this.destroyed))
            .subscribe(this.addMarkersAndUpdateH3Polygons.bind(this));
    }

    public onMapLoad(map: mapboxgl.Map) {
        console.log('[MAP]', map);
        this.map = map;
        this.updateH3Pulses();
        this.addInitialLayersAndSourcesToDisplayData();
    }

    public handleZoomEnd = () => this.updateH3Pulses();
    
    public handleMoveEnd = () => this.updateH3Pulses();

    private addInitialLayersAndSourcesToDisplayData(): void {
        this.map.addSource('hexagons', {
            type: 'geojson',
        });
        this.map.addLayer({
            id: 'hexagon-layer',
            type: 'line',
            source: 'hexagons',
            layout: {},
            paint: {
                'line-color': '#FFFFFF', // Border color
                'line-width': 1.5, // Border width in pixels
                // 'line-emissive-strength': 2
            },
        });
    }

    private addMarkersAndUpdateH3Polygons(h3PulsesData: any): void {
        const geojsonData: any = this.convertH3ToGeoJSON(h3PulsesData);
        (this.map.getSource('hexagons') as any).setData(geojsonData);

        this.addMarkersToMap(h3PulsesData);
    }

    private updateH3Pulses(): void {
        const { _ne, _sw } = this.map.getBounds();
        const resolution = this.getResolutionBasedOnMapZoom();

        this.pulseService
            .getH3PulsesForMap(_ne.lat, _ne.lng, _sw.lat, _sw.lng, resolution)
            .pipe(first())
            .subscribe((h3PulsesData) => this.h3Pulses$.next(h3PulsesData));
    }

    private getResolutionBasedOnMapZoom(): number {
        const zoom = this.map.getZoom();
        if (zoom < 4) return 1;
        if (zoom < 11) return 2;
        if (zoom < 14) return 3;
        return 4;
    }

    private convertH3ToGeoJSON(data: any) {
        const features = Object.keys(data).map((h3Index) => {
            const polygon = h3.cellToBoundary(h3Index, true);
            return {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [polygon],
                },
                properties: {
                    votes: data[h3Index].votes,
                    users: data[h3Index].users,
                    icon: data[h3Index].icon,
                    h3Index,
                },
            };
        });

        return {
            type: 'FeatureCollection',
            features,
        };
    }

    private addMarkersToMap(data: any): void {
        this.markers = [];
        Object.keys(data).forEach((h3Index: any) => {
            const [lat, lng] = h3.cellToLatLng(h3Index);
            this.markers.push({
                lng,
                lat,
                icon: data[h3Index].icon,
                h3Index,
            });
        });
    }
}
