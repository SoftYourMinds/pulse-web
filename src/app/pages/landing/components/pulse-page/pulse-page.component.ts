import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first, take } from 'rxjs';
import { IPulse } from '../../../../shared/interfaces';
import { PulseService } from '../../../../shared/services/pulse.service';

@Component({
    selector: 'app-pulse-page',
    templateUrl: './pulse-page.component.html',
    styleUrl: './pulse-page.component.scss',
})
export class PulsePageComponent implements OnInit {
    public pulse: IPulse;
    public isReadMore: boolean = false;

    @ViewChild('description', {static: false}) public description: ElementRef<HTMLDivElement>;

    private readonly router: Router = inject(Router);
    private readonly route: ActivatedRoute = inject(ActivatedRoute);
    private readonly pulseService: PulseService = inject(PulseService);

    public ngOnInit(): void {
        this.initPulseUrlIdListener();
    }

    public onReadMore(): void {
        this.isReadMore = true;
    }

    private initPulseUrlIdListener(): void {
        this.route.paramMap
            .pipe(take(1))
            .subscribe(this.handlePulseUrlIdListener.bind(this));
    }

    private handlePulseUrlIdListener(data: ParamMap): void {
        const id = +data.get('id')!;

        if (!id || 'number' !== typeof id) {
            console.error('Invalid pulse ID');
            this.router.navigateByUrl('/');
            return;
        }

        this.getPulseById(id);
    }

    private getPulseById(id: string | number): void {
        this.pulseService
            .getById(id)
            .pipe(first())
            .subscribe((pulse) => {
                this.pulse = pulse;
                this.determineIfNeedToRemoveShowMoreButton();
            });
    }

    private determineIfNeedToRemoveShowMoreButton(): void {
        setTimeout(() => {
            const textElement = this.description.nativeElement;

            const fullHeight = textElement!.scrollHeight;
            const visibleHeight = textElement!.clientHeight + 2;
            const isTruncated = visibleHeight < fullHeight;

            this.isReadMore = !isTruncated;
            console.log(this.isReadMore, fullHeight, visibleHeight);
        }, 100);
    }
}

