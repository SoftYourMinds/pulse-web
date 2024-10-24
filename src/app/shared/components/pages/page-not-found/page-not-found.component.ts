import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { PrimaryButtonComponent } from '../../ui-kit/buttons/primary-button/primary-button.component';
import { AppRoutes } from '../../../enums/app-routes.enum';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [
    SvgIconComponent,
    PrimaryButtonComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  public routes = AppRoutes;
}
