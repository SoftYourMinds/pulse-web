import {
    animate,
    keyframes,
    style,
    transition,
    trigger 
} from "@angular/animations";

export const heartBeatAnimation = trigger('heartBeat', [
    transition('* => *', [
      animate(
        '1s infinite', // Duration and infinite loop
        keyframes([
          style({ transform: 'scale(1)', offset: 0 }),      // Start at normal size
          style({ transform: 'scale(1.1)', offset: 0.1 }),  // Scale up at 10%
          style({ transform: 'scale(1)', offset: 1 }),      // Return to normal size
        ])
      )
    ]),
  ]);
  