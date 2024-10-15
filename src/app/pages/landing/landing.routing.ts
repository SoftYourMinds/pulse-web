import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { PulsePageComponent } from './components/pulse-page/pulse-page.component';
import { PulsesComponent } from './components/pulses/pulses.component';
import { LandingComponent } from './landing.component';
import { AppRoutes } from '../../shared/enums/app-routes.enum';
import { FooterGuard } from '../../shared/guards/footer.guard';
import { FooterCleanupGuard } from '../../shared/guards/footerCleanup.guard';
import { MapPageComponent } from './components/map-page/map-page.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { TermsComponent } from '../terms/terms.component';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: AppRoutes.HOME,
                component: MainComponent,
                // data: { animation: 'openClosePage' },
            },
            {
                path: AppRoutes.MAP,
                component: MapPageComponent,
                canActivate: [FooterGuard],
                canDeactivate: [FooterCleanupGuard],
                
                // data: { animation: 'openClosePage' },
            },
            {
                path: AppRoutes.PULSES,
                component: PulsesComponent,
                // data: { animation: 'openClosePage' },
            },
            {
                path: AppRoutes.PULSE,
                component: PulsePageComponent,
                // data: { animation: 'openClosePage' },
            },
            {
                path: AppRoutes.PRIVACY,
                component: PrivacyComponent,
            },

            {
                path: AppRoutes.TERMS,
                component: TermsComponent,
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
