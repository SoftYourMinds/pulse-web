import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { PrimaryButtonComponent } from '../ui-kit/buttons/primary-button/primary-button.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, PrimaryButtonComponent, SvgIconComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {}
