import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { PulsePageComponent } from './components/pulse-page/pulse-page.component';
import { PulsesComponent } from './components/pulses/pulses.component';
import { LandingComponent } from './landing.component';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: '',
                component: MainComponent,
                // data: { animation: 'openClosePage' },
            },
            {
                path: 'map',
                component: MapComponent,
                // data: { animation: 'openClosePage' },
            },
            {
                path: 'pulses',
                component: PulsesComponent,
                // data: { animation: 'openClosePage' },
            },
            {
                path: 'pulse/:id',
                component: PulsePageComponent,
                // data: { animation: 'openClosePage' },
            },
            // {
            //     path: '**',
            //     redirectTo: '',
            //     // data: { animation: 'openClosePage' },
            // },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class LandingRoutingModule {}
