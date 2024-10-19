import { Component, inject } from '@angular/core';
import { IPulse } from '../../../../shared/interfaces';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PulseService } from '../../../../shared/services/api/pulse.service';
import { catchError, first, of, take } from 'rxjs';

@Component({
  selector: 'app-pulse-heatmap-page',
  templateUrl: './pulse-heatmap-page.component.html',
  styleUrl: './pulse-heatmap-page.component.scss'
})
export class PulseHeatmapPageComponent {  
    public pulse: IPulse;

    private readonly router: Router = inject(Router);
    private readonly route: ActivatedRoute = inject(ActivatedRoute);
    private readonly pulseService: PulseService = inject(PulseService);

    public ngOnInit(): void {
        this.initPulseUrlIdListener();
    }

    private initPulseUrlIdListener(): void {
        this.route.paramMap
            .pipe(take(1))
            .subscribe(this.handlePulseUrlIdListener.bind(this));
    }

    private handlePulseUrlIdListener(data: ParamMap): void {
        const id = data.get('id')!;

        this.getPulseById(id);
    }

    private getPulseById(id: string | number): void {
        this.pulseService
            .getById(id)
            .pipe(
                first(), 
                catchError((error) => {
                    this.router.navigateByUrl('/');
                    return of(error);
                })
            )
            .subscribe((pulse) => {
                this.pulse = pulse;
            });
    }

    public backToPulsePage(): void {
        this.router.navigateByUrl(`pulse/${this.pulse.id}`);
    }

}
