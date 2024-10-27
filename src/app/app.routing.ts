import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityModule } from './pages';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages').then((m) => m.LandingModule),
    },
    {
        path: '',
        loadChildren: () => import('./pages').then((m) => m.CommunityModule)
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
