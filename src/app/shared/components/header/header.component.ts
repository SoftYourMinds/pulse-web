import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { PrimaryButtonComponent } from '../ui-kit/buttons/primary-button/primary-button.component';
import { BurgerButtonComponent } from '../ui-kit/buttons/burger-button/burger-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        PrimaryButtonComponent,
        SvgIconComponent,
        BurgerButtonComponent,
        FormsModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    public isMobileDropdown: boolean = false;

    public toggleDropdown(): void {
        this.isMobileDropdown = !this.isMobileDropdown;
        if(this.isMobileDropdown) this.disableDocumentScroll();
        else this.enableDocumentScroll(); 
    }

    private disableDocumentScroll(): void {
        document.body.style.overflow = 'hidden';
    }

    private enableDocumentScroll(): void {
        document.body.style.overflow = 'scroll';
    }

 }
