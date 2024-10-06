import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const shakeAnimation = trigger('shake', [
    transition('* => *', [
      animate(
        '0.82s cubic-bezier(.36,.07,.19,.97) 3s infinite', // Delay 3 seconds, duration 0.82s, infinite loop
        keyframes([
          style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
          style({ transform: 'translate3d(2px, 0, 0)', offset: 0.2 }),
          style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.3 }),
          style({ transform: 'translate3d(4px, 0, 0)', offset: 0.4 }),
          style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.5 }),
          style({ transform: 'translate3d(4px, 0, 0)', offset: 0.6 }),
          style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.7 }),
          style({ transform: 'translate3d(2px, 0, 0)', offset: 0.8 }),
          style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 }),
        ])
      )
    ])
  ]);
  