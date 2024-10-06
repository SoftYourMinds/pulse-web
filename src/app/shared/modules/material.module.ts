import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';



const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSelectModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  ScrollingModule,
  MatBadgeModule,
  MatPaginatorModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatRippleModule,
  MatChipsModule,
];

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
