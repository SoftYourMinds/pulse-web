import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { LoadImgPathDirective } from '../../../directives/load-img-path/load-img-path.directive';
import { IPulse } from '../../../interfaces';
import { FormatNumberPipe } from '../../../pipes/format-number.pipe';

@Component({
    selector: 'app-top-pulse-card',
    standalone: true,
    imports: [LoadImgPathDirective, SvgIconComponent, FormatNumberPipe],
    templateUrl: './top-pulse-card.component.html',
    styleUrl: './top-pulse-card.component.scss',
})
export class TopPulseCardComponent {
    @Input() public pulse: IPulse;
}
