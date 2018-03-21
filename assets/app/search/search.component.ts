import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {MovieService} from "../movie/movie.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, OnChanges {

    searchStatus = 'none';
    @Input('number') number;
    @Input('searchInput') searchInput;
    @Output('chosenMovie') chosenMovie = new EventEmitter();
    searchResults;

    constructor(private movieService: MovieService){}

    ngOnChanges(){
        if(this.searchInput[0] === this.number){
            this.movieService.getMovies(this.searchInput)
                .subscribe( result => {
                    this.searchStatus = 'block';
                    this.searchResults = result.obj;
                })
        }
    }

    ngOnInit(){

    }

    changeInput(title) {
        this.chosenMovie.emit(title);
        this.searchStatus = 'none';
    }
}