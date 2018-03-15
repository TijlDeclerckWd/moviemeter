import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { MovieService } from "../movie/movie.service";
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { transition, trigger, useAnimation } from "@angular/animations";
import { fadeInAnimation } from "../animations";


@Component({
    styleUrls: ['./home.component.css'],
    selector: 'app-home',
    templateUrl: './home.component.html',
    animations: [
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
})

export class HomeComponent implements OnInit, OnDestroy {

    private ngUnsubscribe = new Subject();
    isLoggedIn:Boolean;
    fullName;
    trailers;
    trailerIds;

    // DOM sanitizer is used for making custom adjustments to embedded youtube videos, it is not used here because
    // there were issues with the browser making server requests non-stop
    constructor(public sanitizer: DomSanitizer, private authService: AuthService, private movieService: MovieService){}

    ngOnInit(){
        if (localStorage.getItem('token') !== null || undefined){
            this.isLoggedIn = true;
            this.fullName = localStorage.getItem('fullName');
        }
        // get the thumbnails and links of the three most recent movie trailers via the youtube API
        this.movieService.getTrailers()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(trailers => {
                this.trailers = trailers.result;
                this.trailerIds = trailers.trailerIds

            })
    }

    ngOnDestroy(){
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }


}