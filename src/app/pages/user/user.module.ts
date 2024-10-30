import { map } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user.routing';
import { UserComponent } from './user.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { PrimaryButtonComponent } from '../../shared/components/ui-kit/buttons/primary-button/primary-button.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PulsePlaceholderComponent } from './components/pulse-placeholder/pulse-placeholder.component';


@NgModule({
  declarations: [
    UserComponent,
    TopicFormComponent,
    UserFormComponent,
    PulsePlaceholderComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,


    HeaderComponent,
    FooterComponent,

    SvgIconComponent,
    PrimaryButtonComponent,

  ],
  exports: [
    TopicFormComponent,
    UserFormComponent,
    PulsePlaceholderComponent,
  ]
})
export class UserModule { }
