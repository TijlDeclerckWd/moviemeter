import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/rx';



// We need @injectable if we want to use http
@Injectable()

export class AuthService {

    constructor(private http: Http){}

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
        console.log(body);
        return this.http.post('http://localhost:3200/user/', body, {headers: headers})
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