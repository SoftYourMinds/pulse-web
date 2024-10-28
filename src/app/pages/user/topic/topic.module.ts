import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicComponent } from './topic.component';
import { TopicRoutingModule } from './topic.routing';
import { SvgIconComponent } from 'angular-svg-icon';
import { PrimaryButtonComponent } from '../../../shared/components/ui-kit/buttons/primary-button/primary-button.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { SubmittedComponent } from './submitted/submitted.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { SuggestComponent } from './suggest/suggest.component';


@NgModule({
  declarations: [
    TopicComponent,
    HowItWorksComponent,
    SubmittedComponent,
    ContactInfoComponent,
    SuggestComponent
  ],
  imports: [
    CommonModule,
    TopicRoutingModule,


    SvgIconComponent,
    PrimaryButtonComponent,

  ]
})
export class TopicModule { }
