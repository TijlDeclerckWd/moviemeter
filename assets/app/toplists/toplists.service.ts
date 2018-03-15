import {Injectable} from "@angular/core";
import 'rxjs/rx';
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Movie} from "../movie/movie.model";



// We need @injectable if we want to use http
@Injectable()
export class ToplistsService {

    constructor(private http: Http){}

    getList(listType){
        return this.http.get('http://localhost:3200/lists/getList/' + listType)
            .map((response: Response) => {
                let result = response.json();
                console.log(result);
                // // get the averageScore
                // result.obj.forEach(function (obj) {
                //     const averageRating = obj.ratings.reduce((sum, obj) => {
                //         return sum + obj.rating
                //     },0) / obj.ratings.length
                //     obj.averageRating = averageRating
                // });
                // // order according to average rating.
                // result.obj.sort(function (a, b) {return (a.averageRating < b.averageRating) ? 1 : ((b.averageRating < a.averageRating) ? -1 : 0)})
                return result
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }

}
