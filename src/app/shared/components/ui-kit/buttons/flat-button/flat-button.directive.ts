import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[flatButton]',
    standalone: true,
})
export class FlatButtonDirective {
    @HostBinding("class.flat-button") public flatButton =  true;
}