import { Component } from '@angular/core';
import { CloseButtonComponent } from '../../../ui-kit/buttons/close-button/close-button.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatDialogRef } from '@angular/material/dialog';
import { SecondaryButtonComponent } from '../../../ui-kit/buttons/secondary-button/secondary-button.component';

@Component({
  selector: 'app-email-popup',
  templateUrl: './email-popup.component.html',
  styleUrl: './email-popup.component.scss',
  standalone: true,
  imports: [
    CloseButtonComponent,
    SvgIconComponent,
    SecondaryButtonComponent
  ]
})
export class EmailPopupComponent {
  
  constructor(
    public dialogRef: MatDialogRef<EmailPopupComponent>,    
  ) {}

  public onCloseDialog(): void {
      this.dialogRef.close();
  }
}
