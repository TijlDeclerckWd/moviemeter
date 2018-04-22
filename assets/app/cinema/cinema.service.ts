import {Injectable} from "@angular/core";
import 'rxjs/rx';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";



// We need @injectable if we want to use http
@Injectable()
export class CinemaService {
    
    constructor(private http: Http){
    }
    
    getLatestMovie(){
        return this.http.get('http://localhost:3200/cinema/getLatestMovie')
            .map((response: Response) => {
                const result = response.json();
                result.obj.reviews.splice(3);
                result.obj.reviews.forEach(function(obj, index){
                   var arr = obj.content.split('');
                    arr.splice(40);
                    if (arr.length === 40) {
                        arr.push('...');
                    }
                    arr = arr.join('');
                   obj.content = arr;
                });
                return result
            })
            .catch((error: any) => {
                return Observable.throw(error)
            })
    }

}