import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { heartBeatAnimation } from '../../../animations/heart-beat.animation';
import { GetAppButtonComponent } from '../../ui-kit/buttons/get-app-button/get-app-button.component';
import { CloseButtonComponent } from '../../ui-kit/buttons/close-button/close-button.component';

@Component({
  selector: 'app-get-app-popup',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    GetAppButtonComponent,
    CloseButtonComponent, 
  ],
  animations: [
    heartBeatAnimation,
  ],
  templateUrl: './get-app-popup.component.html',
  styleUrl: './get-app-popup.component.scss'
})
export class GetAppPopupComponent {



  public onCloseDialog(): void {
    
  }
}
