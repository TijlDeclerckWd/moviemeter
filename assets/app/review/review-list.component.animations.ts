import {transition, trigger, useAnimation} from "@angular/animations";
import {bounceOutLeftAnimation, fadeInAnimation} from "../animations";

export const reviewListAnimations = [
    trigger('leaveView', [
        transition(':leave', [
            useAnimation(bounceOutLeftAnimation, {
                params: {
                    duration: '1s'
                }
            })
        ])
    ]),
    trigger('fade', [
        transition(':enter', [
            useAnimation(fadeInAnimation, {
                params: {
                    duration: '2s'
                }
            })
        ])
    ])
]