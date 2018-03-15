import {animate, animateChild, query, stagger, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeInAnimation} from "../animations";

export const topListAnimations = [
    trigger('topListAnimations', [
        transition(':enter', [
            query('h1', [
                style({ transform: 'translateY(-20px)' }),
                animate(1000)
            ]),
            query('@fadeIn', [
                stagger(5000, animateChild())
            ], {optional: true})
        ])
    ]),

    trigger('fadeIn', [
        transition(':enter', [
            useAnimation(fadeInAnimation)
        ])
    ])
]