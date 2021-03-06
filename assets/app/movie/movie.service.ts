import {Injectable} from "@angular/core";
import 'rxjs/rx';
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Movie} from "./movie.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {ErrorService} from "../errors/error.service";

// We need @injectable if we want to use http
@Injectable()

export class MovieService {

    averageRating = new Subject();
    trailerIdArray = '';

constructor(private http: Http, private http2: HttpClient, private errorService: ErrorService){}

addMovie(movie: Movie){

    return this.http2.post(
        "http://localhost:3200/lists/addmovie", movie)
            .pipe(catchError(this.handleError)
        )
}

    addRating(rating, userId, movieId) {
        let body = {
            rating: rating,
            userId: userId,
            movieId: movieId
        };

        return this.http2.post('http://localhost:3200/ratings/addRating', body)
            // Here I want to automatically update the average score of the movie
            .map( (result:any) => {

                this.averageRating.next(result.obj);

                return result;
            })
            .pipe(catchError(this.handleError)
            )
    }

countData(){
    return this.http2.get('http://localhost:3200/app/getCounts')
        .catch((error: any) => {
            this.errorService.handleError(error);
            return Observable.throw(error)
        })
}

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };


getMovie(id) {
    return this.http2.get('http://localhost:3200/lists/getmovie/' + id)
        .map( (result: any) => {
            console.log(result);
            console.log(result.obj.averageRating);
            this.averageRating.next(Number(result.obj.averageRating));
            return result
        })
        .pipe(catchError(this.handleError)
        )
}

    getMovies(searchValue) {
        return this.http2.get('http://localhost:3200/movies/getmovies/' + searchValue)
            .pipe(catchError(this.handleError)
            )
    }


    getRating(userId, movieId) {
        return this.http2.get('http://localhost:3200/ratings/getRating/' + userId + '/' + movieId)
            .pipe(catchError(this.handleError)
            )
    }

    getTrailers(){
        return this.http2.get('http://localhost:3200/movies/getTrailers')
            .map( (result: any) => {

                result.trailerIds = [result.result[0].body.items[0].id.videoId, result.result[1].body.items[0].id.videoId, result.result[2].body.items[0].id.videoId]

                return result;
            })
            .pipe(catchError(this.handleError)
            )
    }
}

