import { Component, HostListener } from '@angular/core';
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
        if(this.isMobileDropdown) {
            this.scrollToTop();
            this.disableDocumentScroll();
        }
        else this.enableDocumentScroll(); 
    }

    private disableDocumentScroll(): void {
        // setTimeout(() => window.scrollTo(0,0), 100);
        document.body.style.overflow = 'hidden';
    }

    private enableDocumentScroll(): void {
        document.body.style.overflow = 'scroll';
    }

    public deligateCloseDropdown(event: Event) {
        const targetElement = event.target as HTMLElement;
        
        // Check if the click occurred on an anchor tag (logo or menu links)
        if (targetElement.tagName === 'A') {
          this.isMobileDropdown = false;
          this.enableDocumentScroll();
        }
    }

    public closeDropdown() {
        if(!this.isMobileDropdown) return
        this.isMobileDropdown = false;
        this.enableDocumentScroll();
    }

    // @HostListener('window:scroll', [])
    // onScroll(): void {
    //     if(this.isMobileDropdown) this.closeDropdown();
    //     else return;
    // }

    public scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

 }
