import { Component } from '@angular/core';
import { GetAppButtonComponent } from '../../ui-kit/buttons/get-app-button/get-app-button.component';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [
    GetAppButtonComponent,
  ],
  templateUrl: './ad-banner.component.html',
  styleUrl: './ad-banner.component.scss'
})
export class AdBannerComponent {

}
