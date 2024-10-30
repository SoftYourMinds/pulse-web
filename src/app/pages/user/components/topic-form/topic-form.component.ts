import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutes } from '../../../../shared/enums/app-routes.enum';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrl: './topic-form.component.scss'
})
export class TopicFormComponent {
    public routes = AppRoutes.User.Topic;

    public topicForm: FormGroup;

    constructor(
      private fb: FormBuilder,
    ) {
      
    }

    ngOnInit(): void {
      this.topicForm = this.fb.group({
          icon: [''],
          headline: [''],
          description: [''],
          keywords: ['', Validators.email],
      });
    }

}
