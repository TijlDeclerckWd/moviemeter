import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {MovieService} from "../movie/movie.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, OnChanges {

    searchStatus = 'none';
    @Input('searchInput') searchInput;
    @Output('chosenMovie') chosenMovie = new EventEmitter();
    searchResults;

    constructor(private movieService: MovieService){}

    ngOnChanges(){
        console.log('change detected');
        console.log(this.searchInput);
        this.movieService.getMovies(this.searchInput)
            .subscribe( result => {
                this.searchStatus = 'block';
                this.searchResults = result.obj;
            })
    }

    ngOnInit(){

    }

    changeInput(title) {
        this.chosenMovie.emit(title);
        this.searchStatus = 'none';
    }
}