import { Component, inject, Input, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { PulseService } from '../../../../shared/services/pulse.service';
import { MAPBOX_STYLE } from '../../../../shared/tokens/tokens';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
    @Input() isPreview: boolean = false;

    public readonly mapboxStylesUrl: string = inject(MAPBOX_STYLE);

    private readonly pulseService: PulseService = inject(PulseService);

    public longitude = -120.661;
    public latitude = 37.7749;
    public fitBounds = [
        [-125, 32],
        [-114, 42],
    ];

    // Heatmap data
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

    public markers = [
        { longitude: -120.661, latitude: 37.7749, icon: 'path/to/icon1.png' },
        { longitude: -106.661, latitude: 37.7749, icon: 'path/to/icon1.png' },
        { longitude: -109.661, latitude: 36.7749, icon: 'path/to/icon1.png' },
    ];

    public ngOnInit(): void {
        if (this.isPreview) {
            
        }
    }

    public onMapLoad(map: mapboxgl.Map) {
        console.log('Map loaded', map);
        const bounds = map.getBounds();
        console.log(bounds);

        let { lng, lat } = bounds._ne;
        let lng2 = bounds._sw.lng;
        let lat2 = bounds._sw.lat;

        this.pulseService.test(lat, lng, lat2, lng2);
    }
}
