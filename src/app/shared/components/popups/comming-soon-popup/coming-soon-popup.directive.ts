import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommingSoonPopupComponent } from './comming-soon-popup.component';

@Directive({
    selector: '[openComingSoonPopup]',
    standalone: true,
})
export class ComingSoonPopupDirective {

    constructor( private dialog: MatDialog) {}

    @HostListener('click') 
    openPopup(): void {

        console.log('OPEN POPUP');
        
        this.dialog.open(CommingSoonPopupComponent, {
            width: "630px",
            panelClass: "custom-dialog-container",
            backdropClass: "custom-dialog-backdrop",
        })
    }  
 }