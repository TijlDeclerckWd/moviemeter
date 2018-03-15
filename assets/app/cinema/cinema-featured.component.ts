import {Component, OnInit} from "@angular/core";
import {CinemaService} from "./cinema.service";
import {Movie} from "../movie/movie.model";


@Component({
    selector: 'app-cinema-featured',
    templateUrl: './cinema-featured.component.html',
    styleUrls: ['./cinema-featured.component.css']
})
export class CinemaFeaturedComponent implements OnInit{

    movie:Movie;

    constructor(private cinemaService: CinemaService){}
    
    ngOnInit(){
        this.cinemaService.getLatestMovie()
            .subscribe( result => {
                this.movie = result.obj
            })
    }
    
    
}