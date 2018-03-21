import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {MovieService} from "../movie/movie.service";
import {Movie} from "../movie/movie.model";
import {ToplistsService} from "./toplists.service";
import {ActivatedRoute} from "@angular/router";
import {
    animate, animateChild, query, stagger, style, transition, trigger,
    useAnimation
} from "@angular/animations";
import {fadeInAnimation} from "../animations";
import {topListAnimations} from "./top100.component.animations";

@Component({
    selector: 'app-top100',
    templateUrl: './top100.component.html',
    styleUrls: ['./top100.component.css'],
    animations: topListAnimations
})

export class Top100Component implements OnInit {

    currentRoute;
    movies: Movie[] = [];

    constructor(
        private movieService: MovieService,
        private toplistsService: ToplistsService,
        private route: ActivatedRoute)
    {}


    ngOnInit(){
        this.route.params
            .subscribe(params => {
                this.currentRoute = params.id;
                this.getList(this.currentRoute);
            })
    }

    getList(listType){
        this.toplistsService.getList(listType)
            .subscribe(result => {
                this.movies = result.obj;
            });
    }

    



}

