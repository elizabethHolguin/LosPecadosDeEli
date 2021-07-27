import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

export const showUp = trigger('showUpElement', [
    transition(':enter', [
        style({ 
            transform: 'scale(0)'
         }),
        animate('500ms cubic-bezier(.17,.67,.42,1.27)', style({
            transform: 'scale(1)'
        })),
    ]),
        transition(':leave', [
        animate('500ms cubic-bezier(.17,.67,.42,1.27)', style({
            transform: 'scale(0)'
        }))
    ])
]);