import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ReviewService} from "./review.service";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit{

    movieId;
    @Input('movie') movie;
    @ViewChild('textArea') textArea;


    constructor(private reviewService: ReviewService, private route: ActivatedRoute){}

    ngOnInit(){
        this.route.params.subscribe( params => {
          this.movieId = params.id
        });
    };


    onClear(form: NgForm) {
        form.resetForm()
    }

    onSubmit(form: NgForm) {
        let content = form.value.review;
        let userId = localStorage.getItem('userId');
        let movieId = this.movieId;

            this.reviewService.addReview(content, userId, movieId)
                .subscribe( result => {
                    console.log(result.obj);
                    this.movie.reviews.unshift(result.obj);
                    form.resetForm()
                })


    }
}
