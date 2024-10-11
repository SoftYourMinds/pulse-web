import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RippleEffectDirective } from '../../../../directives/ripple-effect';

@Component({
    selector: 'app-primary-button',
    standalone: true,
    imports: [
        RippleEffectDirective,
    ],
    templateUrl: './primary-button.component.html',
    styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
    @Input() public type: string = 'button';
    @Input() public disabled: boolean = false;

    @Output() public handleClick: EventEmitter<void> = new EventEmitter<void>();

    public onClick(): void {
        if (this.disabled) return;

        this.handleClick.emit();
    }
}
