import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user.routing';
import { UserComponent } from './user.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { PrimaryButtonComponent } from '../../shared/components/ui-kit/buttons/primary-button/primary-button.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';


@NgModule({
  declarations: [
    UserComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,

    HeaderComponent,
    FooterComponent,

    SvgIconComponent,
    PrimaryButtonComponent,

  ]
})
export class UserModule { }
