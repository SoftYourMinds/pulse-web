import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendTopicService } from '../../../../shared/services/core/send-topic.service';

@Component({
    selector: 'app-pulse-placeholder',
    templateUrl: './pulse-placeholder.component.html',
    styleUrl: './pulse-placeholder.component.scss',
})
export class PulsePlaceholderComponent implements OnInit {
    @Input() public info: any;

    private readonly router: Router = inject(Router);
    private readonly sendTopicService: SendTopicService = inject(SendTopicService);

    public ngOnInit(): void {
        this.redirectIfNoDataFound();
    }

    private redirectIfNoDataFound(): void {
        if (this.sendTopicService.currentTopic.valid) return;
        this.router.navigateByUrl('/user/topic/suggest');
    }
}
