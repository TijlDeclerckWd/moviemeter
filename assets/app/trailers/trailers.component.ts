import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../movie/movie.service";


@Component({
    selector: 'app-trailers',
    templateUrl: './trailers.component.html',
    styleUrls: ['./trailers.component.css']
})

export class TrailersComponent implements OnInit{

    trailerIdArray;
    @ViewChild('trailerZone') trailerZone;

    constructor(private route: ActivatedRoute, private router: Router){

    }

    ngOnInit(){
        this.route.queryParams.subscribe( params => {
           let chosenId = params.chosenId;
            this.createDynamicEmbeddedYoutubeTrailer(chosenId);
        });
    }

    createDynamicEmbeddedYoutubeTrailer(id){
        let trailerElem = document.createElement("iframe");
        trailerElem.setAttribute("width", "100%");
        trailerElem.setAttribute("height", "100%");
        trailerElem.setAttribute("src", "https://www.youtube.com/embed/" + id);
        trailerElem.setAttribute("frameBorder", "0");
        trailerElem.setAttribute("allowfullscreen", "");

        this.trailerZone.nativeElement.appendChild(trailerElem);
    }



}
