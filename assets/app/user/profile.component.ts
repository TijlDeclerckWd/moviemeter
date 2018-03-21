import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Subject} from "rxjs/Subject";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy{

    ngUnsubscribe = new Subject();
    statistics;
    user;
    showInput = false;
    input1;
    repeat = ['1','2','3','4','5','6','7','8','9','10'];

    constructor(private authService: AuthService) {
    }

    ngOnInit(){
        this.authService.getUserStatistics(localStorage.getItem('userId'))
            .takeUntil(this.ngUnsubscribe)
            .subscribe( result => {
                this.statistics = result.statistics;
                this.user = result.user;
            });
    }

    getMovies(something){
        console.log(something);
    }

    onSubmit(f){
        console.log(f.value);
    }

    ngOnDestroy(){
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    changeInput(title) {
        console.log(title);
    }
}