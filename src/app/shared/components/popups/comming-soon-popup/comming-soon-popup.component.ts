import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CloseButtonComponent } from '../../ui-kit/buttons/close-button/close-button.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { GetAppButtonComponent } from '../../ui-kit/buttons/get-app-button/get-app-button.component';
import { PrimaryButtonComponent } from '../../ui-kit/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../ui-kit/buttons/secondary-button/secondary-button.component';

@Component({
  selector: 'app-comming-soon-popup',
  standalone: true,
  imports: [
    CloseButtonComponent,
    SvgIconComponent,
    GetAppButtonComponent,
    SecondaryButtonComponent,
    PrimaryButtonComponent,
  ],
  templateUrl: './comming-soon-popup.component.html',
  styleUrl: './comming-soon-popup.component.scss'
})
export class CommingSoonPopupComponent {
  
  constructor(
    public dialogRef: MatDialogRef<CommingSoonPopupComponent>,    
  ) {}

  public onCloseDialog(): void {
      this.dialogRef.close();
  }
}
