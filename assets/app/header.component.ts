import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {MovieService} from "./movie/movie.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "./auth/user.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

    searchResults = null;
    searchStatus = 'none';
    websiteStats;
    mySignupForm;
    modalReference;

    constructor(private authService: AuthService, private movieService: MovieService, private modalService: NgbModal, private route: Router){
    }

    ngOnInit(){
        this.movieService.countData()
            .subscribe( stats => {
                this.websiteStats = stats
            });

        this.mySignupForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
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

    onSignupSubmit() {
        console.log(this.mySignupForm.value.firstName);

        const user =  new User(
            this.mySignupForm.value.email,
            this.mySignupForm.value.password,
            this.mySignupForm.value.firstName,
            this.mySignupForm.value.lastName
        );

        this.authService.signup(user)
            .subscribe(
                data => {
                    setTimeout(() => {
                        this.modalReference.close();
                        this.mySignupForm.reset();
                        this.route.navigateByUrl('/login')
                    }, 2000)

                        ,
                        error => console.error(error)
                }
            );
    }

    open(content) {
        this.modalReference = this.modalService.open(content, { size: 'lg', backdrop: 'static' });

        this.modalReference.result.then((result) => {
            console.log(result);
        });
    }




}