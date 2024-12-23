import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { BehaviorSubject } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';

export const APP_UI_INPUT_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
};

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [FormsModule, SvgIconComponent, SpinnerComponent],
    providers: [APP_UI_INPUT_ACCESSOR],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
})
export class InputComponent
    implements OnInit, AfterViewInit, ControlValueAccessor
{
    @Input() public id: string;
    @Input() public name: string;
    @Input() public svg: string;
    @Input() public min: number | string;
    @Input() public max: number | string;
    @Input() public label: string = '';
    @Input() public hasErrorClass: boolean;
    @Input() public placeholder: string = '';
    @Input() public required: boolean = false;
    @Input() public isLoading: boolean = false;
    @Input() public inputType: string = 'text';
    @Input() public autocomplete: string | boolean;
    @Input() public preventBrowserAutofill: boolean;

    @Output() public emitBlur: EventEmitter<any> = new EventEmitter();
    @Output() public emitFocus: EventEmitter<any> = new EventEmitter();
    @Output() public onInput: EventEmitter<any> = new EventEmitter();
    @Output() public emitAutofill: EventEmitter<any> = new EventEmitter();

    @ViewChild('inputRef', { static: true }) public inputRef: ElementRef;

    public isOnFocus: boolean;
    public isPasswordVisible: boolean;

    private _autofillSubject: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    public autofillObservable = this._autofillSubject.asObservable();

    private readonly INPUT_IN_FOCUS_CLASS = 'app-ui-input--focus';
    private readonly INPUT_HAS_VALUE_CLASS = 'app-ui-input--has-value';
    private _value = '';

    disabled: boolean;
    onTouched: () => void;

    @HostBinding('attr.class')
    private get classes() {
        return [
            this.isOnFocus ? this.INPUT_IN_FOCUS_CLASS : '',
            this.value?.length ? this.INPUT_HAS_VALUE_CLASS : '',
        ]
            .filter(Boolean)
            .join(' ');
    }

    @Input()
    set value(val: any) {
        this._value = val ? val : '';
        this.onChange(this._value);
    }

    get value() {
        return this._value;
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    public onChange(val: string) {}

    public writeValue(value: string): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public onAutoFill(event: any): void {
        this._autofillSubject.next(event.complete);
        this.emitAutofill.emit();
    }
}
