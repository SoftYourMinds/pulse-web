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

    public isHideDebugger: boolean = false;

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
        this.map = map;

        this.addInitialLayersAndSourcesToDisplayData();
        this.addH3PolygonsToMap();
        this.updateH3Pulses();
    }

    public handleZoomEnd = () => this.updateH3Pulses();

    public handleMoveEnd = () => this.updateH3Pulses();

    private addInitialLayersAndSourcesToDisplayData(): void {
        const sourceId = 'h3-polygons';

        this.map.addSource('hexagons', {
            type: 'geojson',
        });

        this.map.addSource(sourceId, {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [],
            },
        });

        this.map.addLayer({
            id: 'hexagons',
            type: 'fill',
            source: 'hexagons',
            layout: {},
            paint: {
                'fill-color': '#7700EE',
                'fill-opacity': 0.15,
            },
        });

        this.map.addLayer({
            id: 'h3-polygons-layer',
            type: 'line',
            source: sourceId,
            layout: {},
            paint: {
                'line-color': '#FFFFFF',
                'line-width': 1.5,
            },
        });
    }

    private addMarkersAndUpdateH3Polygons(h3PulsesData: any): void {
        const geojsonData: any = this.convertH3ToGeoJSON(h3PulsesData);
        (this.map.getSource('hexagons') as any).setData(geojsonData);
        this.map?.setPaintProperty('hexagons', 'fill-opacity', 0.15);

        this.addMarkersToMap(h3PulsesData);
    }

    private updateH3Pulses(): void {
        this.map?.setPaintProperty('hexagons', 'fill-opacity', 0);
        this.addH3PolygonsToMap();

        const { _ne, _sw } = this.map.getBounds();
        const resolution = this.getResolutionBasedOnMapZoom();

        this.pulseService
            .getH3PulsesForMap(_ne.lat, _ne.lng, _sw.lat, _sw.lng, resolution)
            .pipe(first())
            .subscribe((h3PulsesData) => this.h3Pulses$.next(h3PulsesData));
    }

    public getResolutionBasedOnMapZoom(): number {
        const zoom = this.map?.getZoom();

        const zoomResolutionMap: { [key: number]: number } = {
            0: 1,
            1: 1,
            2: 1,
            3: 1,
            4: 2,
            5: 2,
            6: 3,
            7: 4,
            8: 4,
            9: 5,
            10: 6,
            11: 7,
            12: 8,
            13: 9,
            14: 10,
            15: 11,
        };

        return zoomResolutionMap[Math.floor(zoom)] || 11;
    }

    private convertH3ToGeoJSON(data: any) {
        const features = Object.keys(data).map((h3Index) => {
            const polygon = h3.h3ToGeoBoundary(h3Index, true);
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
            const [lat, lng] = h3.h3ToGeo(h3Index);
            this.markers.push({
                lng,
                lat,
                icon: data[h3Index].icon,
                h3Index,
            });
        });
    }

    private addH3PolygonsToMap(): void {
        const bounds = this.map.getBounds();
        const northWest = bounds.getNorthWest();
        const southEast = bounds.getSouthEast();
        const resolution = this.getResolutionBasedOnMapZoom();

        const hexagons = this.getHexagonsForBounds(
            northWest,
            southEast,
            resolution
        );

        const hexagonFeatures = hexagons.map((hex) =>
            this.h3ToPolygonFeature(hex)
        );

        const sourceId = 'h3-polygons';

        const source = this.map.getSource(sourceId) as mapboxgl.GeoJSONSource;

        source.setData({
            type: 'FeatureCollection',
            features: hexagonFeatures,
        });
    }

    public getStepBasedOnZoom(): number {
        const zoom = this.map?.getZoom();
        if (zoom < 4) return 1;
        if (zoom < 5) return 0.5;
        if (zoom < 7) return 0.15;
        if (zoom < 9) return 0.02;
        if (zoom < 12) return 0.005;
        if (zoom < 15) return 0.001;
        return 0.0001;
    }

    private getHexagonsForBounds(
        northWest: mapboxgl.LngLat,
        southEast: mapboxgl.LngLat,
        resolution: number
    ): string[] {
        const hexagons = [];
        const step = this.getStepBasedOnZoom();

        for (let lat = southEast.lat; lat < northWest.lat; lat += step) {
            for (let lng = northWest.lng; lng < southEast.lng; lng += step) {
                const hex = h3.geoToH3(lat, lng, resolution);
                hexagons.push(hex);
            }
        }

        return [...new Set(hexagons)];
    }

    private h3ToPolygonFeature(hex: string): GeoJSON.Feature<GeoJSON.Polygon> {
        const boundary = h3.h3ToGeoBoundary(hex, true);
        return {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [boundary],
            },
            properties: {},
        };
    }
}
