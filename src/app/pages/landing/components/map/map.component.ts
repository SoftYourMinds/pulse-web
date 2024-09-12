import { Component, inject } from '@angular/core';
import { MAPBOX_STYLE } from '../../../../shared/tokens/tokens';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
})
export class MapComponent {
    public readonly mapboxStylesUrl: string = inject(MAPBOX_STYLE);

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
            // Добавь еще точки
        ],
    };

    public markers = [
        { longitude: -120.661, latitude: 37.7749, icon: 'path/to/icon1.png' },
        { longitude: -56.661, latitude: 37.7749, icon: 'path/to/icon1.png' },
    ];

    public onMapLoad(map: any) {
        console.log('Map loaded', map);
    }
}
