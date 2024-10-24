import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/pages/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages').then((m) => m.LandingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent, 
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableViewTransitions: true,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
