import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MovieService} from "../movie/movie.service";

@Component({
    selector: 'app-trailers',
    templateUrl: './trailers.component.html',
    styleUrls: ['./trailers.component.css']
})

export class TrailersComponent implements OnInit{

    trailerIdArray;

    constructor(private route: ActivatedRoute, private movieService: MovieService){

    }

    ngOnInit(){
        this.route.queryParams.subscribe( params => {
            console.log(params);
            // Observable of Id: every time the id changes we make a new element and add it to the template.
            // createDynamicEmbeddedyoutubeTrailer();
        });
    }


}
