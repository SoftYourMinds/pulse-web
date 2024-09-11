import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SvgIconComponent } from 'angular-svg-icon';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PrimaryButtonComponent } from '../../shared/components/ui-kit/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/ui-kit/buttons/secondary-button/secondary-button.component';
import { InputComponent } from '../../shared/components/ui-kit/input/input.component';
import { MainBannerComponent } from './components/main/components/main-banner/main-banner.component';
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { PulsesComponent } from './components/pulses/pulses.component';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing.routing';
import { TopPulsesComponent } from './components/main/components/top-pulses/top-pulses.component';

@NgModule({
    declarations: [
        LandingComponent,
        MainBannerComponent,
        MainComponent,
        MapComponent,
        PulsesComponent,
        TopPulsesComponent,
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        PrimaryButtonComponent,
        SecondaryButtonComponent,
        InputComponent,
        HeaderComponent,
        SvgIconComponent,
    ],
})
export class LandingModule {}
