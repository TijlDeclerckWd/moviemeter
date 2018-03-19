import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/rx';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";


// We need @injectable if we want to use http
@Injectable()

export class AuthService {

    constructor(private http: Http, private http2: HttpClient){}

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

    getUser(userId){
        const headers =  new Headers({'Content-Type': 'application/json'});
        return this.http.get('http://localhost:3200/user/getUser/' + userId, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                return result
            })
            .catch((error: any) => {
                console.log(error)
                return Observable.throw(error)
            })
    }

    getUserStatistics(userId){
        console.log('service time');
        const headers =  new Headers({'Content-Type': 'application/json'});
        return this.http.get('http://localhost:3200/user/getUserStatistics/' + userId, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                return result
            })
            .catch((error: any) => {
                console.log(error)
                return Observable.throw(error)
            })
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        if (token) {
            return true
        }
        else {
            return false
        }
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers =  new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3200/user/signup', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                return result
            })
            .catch((error: any) => {
                console.log(error)
                return Observable.throw(error)
            })
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers =  new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3200/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
            })
    }

    getApi(){
       return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=black%20panther&key=AIzaSyD4shfocwn-Ed3Feuoo9fG3d2K2GjHmKeI&maxResults=20&order=viewCount&type=video')
           .map((response: Response) => response.json())
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}