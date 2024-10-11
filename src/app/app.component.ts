import { Component, inject } from '@angular/core';
import { combineLatest, take } from 'rxjs';
import { AuthenticationService } from './shared/services/api/authentication.service';
import { PulseService } from './shared/services/api/pulse.service';
import { LoadingService } from './shared/services/core/loading.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-root',
    template: `

            <!-- <div *ngIf="isLoading; else content" 
                @fadeOut>
                  <app-loading-page></app-loading-page>
            </div>

            <ng-template #content>
                <router-outlet></router-outlet>
            </ng-template> -->
        @if (isLoading) { 
            <app-loading-page />

        } @else {
            <router-outlet></router-outlet>
        }

    `,
    animations: [
        trigger('fadeOut', [
          state('void', style({
            opacity: 0
          })),
          transition(':leave', [
            animate('100ms ease-in')
          ])
        ])
    ],
})
export class AppComponent {
    public isLoading: boolean = false;
    private readonly authenticationService: AuthenticationService = inject(
        AuthenticationService
    );
    private readonly pulseService: PulseService = inject(
        PulseService
    );

    private readonly loadingService: LoadingService = inject( LoadingService);

    public ngOnInit() {
        this.sendInitialQueries();
    }

    private sendInitialQueries(): void {
        this.isLoading = true;
        this.loadingService.isLoading = true;

        const anonymousUser$ = this.authenticationService.loginAsAnonymousThroughTheFirebase();
        const settings$ = this.pulseService.getSettings();

        combineLatest([anonymousUser$, settings$])
            .pipe(take(1))
            .subscribe((_) => {
                setTimeout(() => { 

                    this.loadingService.isLoading = false;
                    setTimeout(() => {
                        this.isLoading = false
                    }, 1000);
                }, 1000);
                
            });
    }

    


}
