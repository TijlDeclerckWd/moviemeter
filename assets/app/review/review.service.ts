import {Injectable} from "@angular/core";
import 'rxjs/rx';
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Movie} from "../movie/movie.model";
import {Review} from "./review.model";



// We need @injectable if we want to use http
@Injectable()

export class ReviewService {

    constructor(private http: Http){
    }

    addReview(review, userId, movieId){
        let body = {
            review:review,
            userId:userId,
            movieId: movieId
        };
        let JSONbody = JSON.stringify(body);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post('http://localhost:3200/reviews/addReview', JSONbody, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                return result
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());

            })
    }

    deleteReview(reviewId) {
        return this.http.delete('http://localhost:3200/reviews/deleteReview/' + reviewId)
            .map((response: Response) => {
                const result = response.json();
                return result
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());

            })
    }

    editReview(content, reviewId) {
        let body = {
            content: content,
            reviewId: reviewId
        };
        let jsonBody = JSON.stringify(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put('http://localhost:3200/reviews/editReview', jsonBody, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                console.log(result);
                return result
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());

            })
    }
}