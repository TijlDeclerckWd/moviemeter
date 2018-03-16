import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from "@angular/core";
import { MovieService} from "./movie.service";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {DomSanitizer} from "@angular/platform-browser";


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


    constructor(private movieService: MovieService, private route: ActivatedRoute){

    }

    checkRating(){
        return typeof this.rating === 'number';
    }

    ngOnInit(){
        this.route.params.subscribe(params => {
           this.movieId = params.id;

            var userId = localStorage.getItem('userId');

            // Here I subscribe to changes made to the average rating, this will be triggered when the user adds his own rating,
            // I'm not sure if this would be a useful feature when there are thousands of ratings, but I wanted to test Subjects and how they work.
            this.movieService.averageRating
                .takeUntil(this.ngUnsubscribe)
                .subscribe( averageRating => {
                    console.log(averageRating);
                    this.averageRating =  averageRating
                });

            this.movieService.getMovie(this.movieId)
                .takeUntil(this.ngUnsubscribe)
                .subscribe(movie => {
                    this.movie = movie.obj;
                    this.movie.averageRating = Number(this.movie.averageRating);
                    console.log(this.movie);
                });

            if (userId){
                this.movieService.getRating(userId, this.movieId)
                    .takeUntil(this.ngUnsubscribe)
                    .subscribe( result => {
                        this.rating = result.rating;
                    })
            }
        });
    }

    addRating(score) {
        let userId = localStorage.getItem('userId');

        this.movieService.addRating(score, userId, this.movie._id)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                this.rating = data.obj.rating;
            });
    }

    ngOnDestroy(){
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}




