import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {MovieService} from "../movie/movie.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnChanges {

    searchStatus = 'none';
    @Input('number') number;
    @Input('searchInput') searchInput;
    @Output('chosenMovie') chosenMovie = new EventEmitter();
    searchResults;

    constructor(private movieService: MovieService){}

    ngOnChanges(){
        if(this.searchInput[0] === this.number){
            this.movieService.getMovies(this.searchInput[1])
                .subscribe( result => {
                    console.log(result);
                    this.searchStatus = 'block';
                    this.searchResults = result.obj;
                })
        }
    }

    changeInput(title) {
        this.chosenMovie.emit(title);
        this.searchStatus = 'none';
    }
}