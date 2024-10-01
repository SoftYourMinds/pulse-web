import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { PrimaryButtonComponent } from '../ui-kit/buttons/primary-button/primary-button.component';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterModule, PrimaryButtonComponent, SvgIconComponent],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {}
