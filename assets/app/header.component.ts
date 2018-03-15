import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {MovieService} from "./movie/movie.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

    searchResults = null;
    searchStatus = 'none';
    websiteStats;

    constructor(private authService: AuthService, private movieService: MovieService){
    }

    isLoggedIn(){
        return this.authService.isLoggedIn()
    }

    clearInput(input){
        input.value = '';
        this.searchStatus = 'none';
    }

    getMovies(value){
        if (value.length === 0 ) {
            this.searchStatus = 'none'
        }
        else{
            this.searchStatus = 'block';
            this.movieService.getMovies(value)
                .subscribe( result => {
                    this.searchResults = result.obj
                })
        }
    }

    ngOnInit(){
        this.movieService.countData()
            .subscribe( stats => {
                this.websiteStats = stats
            });
    }




}