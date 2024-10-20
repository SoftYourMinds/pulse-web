import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LargePulseComponent } from '../../shared/components/pulses/large-pulse/large-pulse.component';
import { TopPulseCardComponent } from '../../shared/components/pulses/top-pulse/top-pulse-card.component';
import { PrimaryButtonComponent } from '../../shared/components/ui-kit/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/ui-kit/buttons/secondary-button/secondary-button.component';
import { InputComponent } from '../../shared/components/ui-kit/input/input.component';
import { SpinnerComponent } from '../../shared/components/ui-kit/spinner/spinner.component';
import { LoadImgPathDirective } from '../../shared/directives/load-img-path/load-img-path.directive';
import { FormatNumberPipe } from '../../shared/pipes/format-number.pipe';
import { MainBannerComponent } from './components/main/components/main-banner/main-banner.component';
import { TopPulsesComponent } from './components/main/components/top-pulses/top-pulses.component';
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { PulsePageComponent } from './components/pulse-page/pulse-page.component';
import { InputSearchComponent } from './components/pulses/components/input-search/input-search.component';
import { PromoteAdsComponent } from './components/pulses/components/promote-ads/promote-ads.component';
import { PulsesComponent } from './components/pulses/pulses.component';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing.routing';
import { OpenGetAppPopupDirective } from '../../shared/components/popups/get-app-popup/open-get-app-popup.directive';
import { HeartBeatDirective } from '../../shared/animations/heart-beat.directive';
import { GetAppButtonComponent } from '../../shared/components/ui-kit/buttons/get-app-button/get-app-button.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { ComingSoonPopupDirective } from '../../shared/components/popups/comming-soon-popup/coming-soon-popup.directive';
import { FlatButtonDirective } from '../../shared/components/ui-kit/buttons/flat-button/flat-button.directive';
import { PulseHeatmapPageComponent } from './components/pulse-heatmap-page/pulse-heatmap-page.component';
import { FadeInDirective } from '../../shared/animations/fade-in.directive';

@NgModule({
    declarations: [
        LandingComponent,
        MainBannerComponent,
        MainComponent,
        MapComponent,
        PulsesComponent,
        TopPulsesComponent,
        InputSearchComponent,
        PromoteAdsComponent,
        PulsePageComponent,
        MapPageComponent,
        PulseHeatmapPageComponent,
        
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        PrimaryButtonComponent,
        SecondaryButtonComponent,
        InputComponent,
        HeaderComponent,
        FooterComponent,
        SvgIconComponent,
        LoadImgPathDirective,
        TopPulseCardComponent,
        LargePulseComponent,
        FormsModule,
        SpinnerComponent,
        FormatNumberPipe,
        
        OpenGetAppPopupDirective,
        HeartBeatDirective,
        GetAppButtonComponent,
        ComingSoonPopupDirective,
        FlatButtonDirective,
        FadeInDirective,
        
        NgxMapboxGLModule.withConfig({
            accessToken: environment.mapboxToken,
        }),
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LandingModule {}
