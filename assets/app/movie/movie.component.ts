import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from "@angular/core";
import { MovieService} from "./movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../auth/auth.service";


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject();
    rating;
    movie;
    movieId;
    averageRating;
    selected = 0;
    hovered = 0;
    currentRoute;


    constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private authService: AuthService, private route: Router){

    }

    checkRating(){
        return typeof this.rating === 'number';
    }

    ngOnInit(){
        this.currentRoute = this.route.url;

        this.activatedRoute.params.subscribe(params => {
           this.movieId = params.id;

            let userId = localStorage.getItem('userId');

            // Here I subscribe to changes made to the average rating, this will be triggered when the user adds his own rating,
            // I'm not sure if this would be a useful feature when there are thousands of ratings, but I wanted to test Subjects and how they work.
            this.movieService.averageRating
                .takeUntil(this.ngUnsubscribe)
                .subscribe( averageRating => {
                    this.averageRating =  averageRating
                });

            this.movieService.getMovie(this.movieId)
                .takeUntil(this.ngUnsubscribe)
                .subscribe(movie => {
                    this.movie = movie.obj;
                    this.movie.averageRating = Number(this.movie.averageRating);
                });

            if (userId){
                this.movieService.getRating(userId, this.movieId)
                    .takeUntil(this.ngUnsubscribe)
                    .subscribe( result => {
                        this.rating = result.rating;
                        console.log(result);
                        this.selected = result.rating;
                    })
            }
        });
    }

    addRating() {
        let userId = localStorage.getItem('userId');
        setTimeout( () => {
            let score = this.selected;
                this.movieService.addRating(score, userId, this.movie._id)
                    .takeUntil(this.ngUnsubscribe)
                    .subscribe(data => {
                        // console.log(data.obj.rating);
                        // this.rating = data.obj.rating;
                    });
        },500)
    }

    ngOnDestroy(){
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}




