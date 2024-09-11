import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages').then((m) => m.LandingModule),
    },
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
