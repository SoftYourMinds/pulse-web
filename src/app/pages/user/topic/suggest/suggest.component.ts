import { Component } from '@angular/core';
import { AppRoutes } from '../../../../shared/enums/app-routes.enum';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrl: './suggest.component.scss'
})
export class SuggestComponent {

  public routes = AppRoutes.User.Topic;

}
