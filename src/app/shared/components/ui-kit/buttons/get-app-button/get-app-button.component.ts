import { PlatformService } from './../../../../services/core/platform.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { RippleEffectDirective } from '../../../../directives/ripple-effect';

@Component({
  selector: 'app-get-app-button',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    RippleEffectDirective,
  ],
  templateUrl: './get-app-button.component.html',
  styleUrl: './get-app-button.component.scss'
})
export class GetAppButtonComponent {

    constructor(
      public platformService: PlatformService
    ) {}

    public onClick(): void {
      window.open("https://www.google.com")
    }

}
