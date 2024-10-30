import { Component } from '@angular/core';
import { AppRoutes } from '../../../../shared/enums/app-routes.enum';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent {

    public routes = AppRoutes;
}
