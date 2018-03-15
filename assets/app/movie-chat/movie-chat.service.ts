import {Injectable} from "@angular/core";
import 'rxjs/rx';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {interval} from "rxjs/observable/interval";
import {Subject} from "rxjs/Subject";

// We need @injectable if we want to use http
@Injectable()

export class MovieChatService {

    ws;
    private subject = new Subject();

    constructor(private http: HttpClient) {
    }

    // receive events
    createObservableSocket(url:string){
        this.ws = new WebSocket(url);
        return new Observable(observer => {
            this.ws.onmessage = (e) => {
                console.log(e.data);
                try {
                    var object = JSON.parse(e.data);
                    let time = new Date();
                    let msTime = time.getTime();
                    object.time = msTime;
                    object.minutesAgo = 0;
                    observer.next(object);
                } catch (e) {
                    console.log("Cannot parse data : " + e);
                }
            }
            this.ws.onerror = (event) => observer.error(event);
            this.ws.onclose = (event) => observer.complete();
        }
        );
    }

    startTimeCalculations = interval(60000);



    // send events
    sendMessage(message) {

        this.ws.send(JSON.stringify(message));
    }

}