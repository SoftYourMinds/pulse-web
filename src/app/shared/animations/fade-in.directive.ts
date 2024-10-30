import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[fadeIn]',
    standalone: true,
})
export class FadeInDirective { 
    @Input() childrenFadeIn: boolean = false;

    constructor(
        private el: ElementRef,
    ) {}

    ngAfterViewInit(): void {
        if(this.childrenFadeIn) this.fadeInChildren()
        else this.fadeIn()
    }

    private fadeIn() {
        let element = this.el.nativeElement as HTMLElement;

        element.classList.add('fade-in');
    }

    
    private fadeInChildren() {
        let children = this.el.nativeElement.children as HTMLCollection;

        let elementsList = Object.values(children);
        
        elementsList.map((element, i) => {
            let e = element as HTMLElement;
            element.classList.add('fade-in');
        })        
        
    }


}