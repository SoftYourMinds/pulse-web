import { Component, HostBinding } from '@angular/core';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.scss',
  standalone: true,
  imports: [
    LogoComponent
  ]
})
export class LoadingPageComponent {

  @HostBinding('style.opacity') hostOpacity = '1';

  
}
