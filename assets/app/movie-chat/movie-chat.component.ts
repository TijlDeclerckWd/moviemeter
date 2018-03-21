import {Component, OnInit} from "@angular/core";
import { MovieChatService} from "./movie-chat.service";

@Component({
    selector: 'app-movie-chat',
    templateUrl: './movie-chat.component.html',
    styleUrls: ['./movie-chat.component.css']
})

export class MovieChatComponent implements OnInit{

    fullName;
    url;
    ws;
    messages = [];
    movieChatElem;
    number = 0;

    constructor(private movieChatService: MovieChatService){

    }

    ngOnInit(){
        this.fullName = localStorage.getItem('fullName');
        this.url = 'ws://localhost:3185';
        this.movieChatService.createObservableSocket(this.url)
            .subscribe(obj => {
                let index = this.messages.length;
                this.messages.push(obj);
                this.movieChatElem.scrollTop = this.movieChatElem.scrollHeight - this.movieChatElem.clientHeight;
                this.movieChatService.startTimeCalculations
                    .subscribe( result => {
                        this.messages[index].minutesAgo++;
                    });
                },
                err => console.log(err),
                () => console.log('The observable stream, is complete'));

    }


    sendMessageToServer(message, chatWindow, messageInput){
        this.movieChatElem = chatWindow;
        messageInput.value = '';
        console.log('Client sending message to websocket server');

            this.movieChatService.sendMessage({
                message: message,
                fullName: this.fullName
            });

    }

    isItMyMsg(fullName){
        return this.fullName === fullName
    }
}