import {Component, Input, OnDestroy, OnInit} from "@angular/core";

@Component({
    selector: 'app-top10Input',
    templateUrl: './top10Input.component.html',
    styleUrls: ['./top10Input.component.css']
})

export class Top10InputComponent implements OnInit, OnDestroy{

    @Input('number') number;

    constructor(){

    }

    ngOnInit(){

    }

    ngOnDestroy(){

    }
}