import { Component, inject } from '@angular/core';
import { SendTopicService } from '../../../../shared/services/core/send-topic.service';

@Component({
    selector: 'app-contact-info',
    templateUrl: './contact-info.component.html',
    styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
    public readonly sendTopicService: SendTopicService = inject(SendTopicService);
}
