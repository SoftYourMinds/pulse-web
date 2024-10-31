import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../../shared/enums/app-routes.enum';
import { SendTopicService } from '../../../../shared/services/core/send-topic.service';

interface Topic {
    name: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-topic-form',
    templateUrl: './topic-form.component.html',
    styleUrl: './topic-form.component.scss',
})
export class TopicFormComponent {
    public routes = AppRoutes.User.Topic;

    public topicForm: FormGroup;
    public imageSrc: string | ArrayBuffer | null = null;

    public topicsForForm: Array<string>;
    public topics: Topic[] = [
        {
            name: 'Politics',
            title: 'Topics about government policies and political events',
            description: 'E.g: Elections, policy changes',
        },
        {
            name: 'Social',
            title: 'Topics related to social issues and trends',
            description: 'E.g: Social media trends, public behavior',
        },
        {
            name: 'Environment',
            title: 'Topics focused on environmental concerns and ecology',
            description: 'E.g: Climate change, wildlife conservation',
        },
        {
            name: 'Health',
            title: 'Topics on health and well-being',
            description: 'E.g: Mental health, fitness, pandemic updates',
        },
        {
            name: 'Technology',
            title: 'Topics about tech advancements and digital culture',
            description: 'E.g: AI developments, software innovations',
        },
        {
            name: 'Economy',
            title: 'Topics on economic developments and markets',
            description: 'E.g: Stock market trends, inflation',
        },
        {
            name: 'Education',
            title: 'Topics concerning learning and academic trends',
            description: 'E.g: Online learning, education policies',
        },
        {
            name: 'Entertainment',
            title: 'Topics in film, music, and other entertainment sectors',
            description: 'E.g: Box office updates, celebrity news',
        },
        {
            name: 'Lifestyle',
            title: 'Topics related to personal lifestyle and hobbies',
            description: 'E.g: Travel tips, fitness routines',
        },
        {
            name: 'Rights',
            title: 'Topics about human rights and legal matters',
            description: 'E.g: Civil rights movements, legal updates',
        },
        {
            name: 'Culture',
            title: 'Topics on cultural practices and traditions',
            description: 'E.g: Art, history, local customs',
        },
        {
            name: 'Science',
            title: 'Topics in scientific discoveries and research',
            description: 'E.g: Space exploration, medical research',
        },
        {
            name: 'Community',
            title: 'Topics on community and local events',
            description: 'E.g: Volunteer events, neighborhood news',
        },
        {
            name: 'International',
            title: 'Topics on global news and international relations',
            description: 'E.g: Foreign policy, international trade',
        },
        {
            name: 'Sports',
            title: 'Topics related to various sports leagues, teams, events, and fan support',
            description: 'E.g: NFL team support, MLB team rallies',
        },
    ];

    private readonly router: Router = inject(Router);
    private readonly sendTopicService: SendTopicService = inject(SendTopicService);
    

    public ngOnInit(): void {
        this.topicForm = this.sendTopicService.currentTopic;
        this.topicsForForm = this.topics.map((topic) => topic.name);
    }

    public getCurrentTopicInfo(): { title: string; description: string } {
        const category = this.topicForm.get('category')?.value;
        return this.topics.filter((topic) => topic.name === category)[0];
    }

    public onFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.topicForm.patchValue({ icon: reader.result });
                this.topicForm.get('icon')?.updateValueAndValidity();
            };
            reader.readAsDataURL(file);
        }
    }

    public onNextButtonClick(): void {
        if (this.topicForm.valid) {
            this.router.navigateByUrl('user/topic/contact-info');
        }
    }
}
