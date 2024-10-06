import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[heartBeatAnimation]',
  standalone: true
})
export class HeartBeatDirective implements OnInit {
    @Input() isBlink: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Add the 'heart-beat' class to the element
    if(this.isBlink) {
        this.renderer.addClass(this.el.nativeElement, 'heart-beat-advanced');
    } else {
        this.renderer.addClass(this.el.nativeElement, 'heart-beat');
    }
  }
}
