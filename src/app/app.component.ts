import { Component, inject } from '@angular/core';
import { combineLatest, take } from 'rxjs';
import { AuthenticationService } from './shared/services/api/authentication.service';
import { PulseService } from './shared/services/api/pulse.service';

@Component({
    selector: 'app-root',
    template: `
        @if (isLoading) { Loading... } @else {
            <router-outlet></router-outlet>
        }
    `,
})
export class AppComponent {
    public isLoading: boolean = false;
    private readonly authenticationService: AuthenticationService = inject(
        AuthenticationService
    );
    private readonly pulseService: PulseService = inject(
        PulseService
    );

    public ngOnInit() {
        this.sendInitialQueries();
    }

    private sendInitialQueries(): void {
        this.isLoading = true;

        const anonymousUser$ = this.authenticationService.loginAsAnonymousThroughTheFirebase();
        const settings$ = this.pulseService.getSettings();

        combineLatest([anonymousUser$, settings$])
            .pipe(take(1))
            .subscribe((_) => (this.isLoading = false));
    }
}
