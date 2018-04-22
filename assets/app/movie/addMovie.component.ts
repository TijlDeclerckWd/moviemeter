import {Component, OnInit} from "@angular/core";
import { MovieService} from "./movie.service";
import {Movie} from "./movie.model";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-addMovie',
    templateUrl: './addMovie.component.html',
    styleUrls: ['./addMovie.component.css']
})

export class AddMovieComponent implements OnInit {

    constructor(private movieService: MovieService){}

    ngOnInit(){

    }

    onClear(form: NgForm) {
        form.resetForm()
    }

    onSubmit(form: NgForm) {
        let movie = new Movie(
            form.value.title,
            form.value.actors,
            form.value.director,
            form.value.length,
            form.value.genre,
            form.value.description,
            form.value.country,
            form.value.year,
            [],
            [],
            form.value.image,
            form.value.trailer
       );
        this.movieService.addMovie(movie)
            .subscribe(result => {
                console.log(result)
            })
    }


}

