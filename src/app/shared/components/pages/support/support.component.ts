import { Component } from '@angular/core';
import { AdBannerComponent } from '../../banners/ad-banner/ad-banner.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    AdBannerComponent
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {

}
