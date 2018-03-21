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

export class ProfileComponent implements OnInit, OnDestroy {

    ngUnsubscribe = new Subject();
    statistics;
    user;
    showInput = false;
    top10Inputs = [{number:1, value: ''},{number:2, value: ''},{number:3, value: ''},{number:4, value: ''},{number:5, value: ''},{number:6, value: ''},{number:7, value: ''},{number:8, value: ''},{number:9, value: ''},{number:10, value: ''}];
    activeSearch;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.getUserStatistics(localStorage.getItem('userId'))
            .takeUntil(this.ngUnsubscribe)
            .subscribe(result => {
                this.statistics = result.statistics;
                this.user = result.user;
            });
    }

    getMovies(something) {
        console.log(something);
    }

    onSubmit(f) {
        console.log(f.value);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    changeInput(title) {
        // get the number of the adjusted element and edit the input. Input depends on top10Input variable in this component.
        var num = this.activeSearch[0];
        this.top10Inputs[num-1].value = title;
    }

    newInput(inputEl) {
        this.top10Inputs[Number(inputEl.name)-1].value = inputEl.value;
        this.activeSearch = [Number(inputEl.name), inputEl.value];
    }
}