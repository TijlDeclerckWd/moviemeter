import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy{

    ngUnsubscribe = new Subject();
    statistics;
    user;

    constructor(private authService: AuthService) {
    }

    ngOnInit(){
        this.authService.getUserStatistics(localStorage.getItem('userId'))
            .takeUntil(this.ngUnsubscribe)
            .subscribe( result => {
                this.statistics = result.statistics;
                this.user = result.user
                console.log(this.user);
            })
    }

    testTop10Status() {

    }



    ngOnDestroy(){
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}