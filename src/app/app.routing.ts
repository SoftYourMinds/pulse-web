import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyComponent } from './pages/privacy/privacy.component';

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
