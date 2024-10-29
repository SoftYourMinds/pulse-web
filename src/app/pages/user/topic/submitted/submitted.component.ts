import { Component } from '@angular/core';
import { AppRoutes } from '../../../../shared/enums/app-routes.enum';

@Component({
  selector: 'app-submitted',
  templateUrl: './submitted.component.html',
  styleUrl: './submitted.component.scss'
})
export class SubmittedComponent {

  public routes = AppRoutes;

}
