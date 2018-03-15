import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Movie} from "../movie/movie.model";
import {ReviewService} from "./review.service";
import {transition, trigger, useAnimation} from "@angular/animations";
import {bounceOutLeftAnimation, fadeInAnimation} from "../animations";
import {removeView} from "@angular/core/src/render3/node_manipulation";
import {reviewListAnimations} from "./review-list.component.animations";
import {text} from "@angular/core/src/render3/instructions";



@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.css'],
    animations: reviewListAnimations
})

export class ReviewListComponent implements OnInit {

    userId;
    movieCopy;
    @Input() movie;

    constructor(private reviewService: ReviewService){}



    ngOnInit(){
        this.userId = localStorage.getItem('userId');
        this.movieCopy = this.movie;
    }

    checkUser(reviewUserId){
        return this.userId === reviewUserId;
    }

    deleteReview(reviewId){
        this.reviewService.deleteReview(reviewId)
            .subscribe(result => {
                this.movie.reviews.splice(result.obj, 1);
            })
    }

    displayModal(content, reviewId, modalEl){
        let textAreaEl = modalEl.querySelector('.textareaEdit');
        textAreaEl.value = content;
        textAreaEl.id = reviewId;
        modalEl.style.display = 'block';
    }

    editReview(el, textareaEl, modalEl) {
        el.movie.reviews.forEach(function(review, index){
            if(review._id === textareaEl.id) {
                review.content = textareaEl.value
            }
        });
        this.reviewService.editReview(textareaEl.value, textareaEl.id)
            .subscribe( result => {
                console.log(result);
                modalEl.style.display = 'none';
            })



    }

}
