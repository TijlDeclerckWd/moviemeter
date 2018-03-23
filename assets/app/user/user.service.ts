import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()

export class UserService {

    constructor(private http: HttpClient){}

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

    addTop10(top10, userId){
        return this.http.post("http://localhost:3200/user/addTop10/" + userId, top10)
            .catch((error: Response) => {
                return Observable.throw(error.json());
            })
    }

    postFile(fileToUpload: File, userId) {
        const formData: FormData = new FormData();
        console.log(fileToUpload);
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        console.log(formData);

        return this.http.post("http://localhost:3200/user/uploadProfilePicture/" + userId, formData)
            .map(() => { return true; })
            .catch((e) => this.handleError(e));
    }
}