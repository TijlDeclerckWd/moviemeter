import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService, private route: Router) {}

    onSubmit() {
        const user =  new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        console.log(user);
        this.authService.signup(user)
            .subscribe(
                data => {
                        console.log(data)
                            this.route.navigateByUrl('/')
                        ,
                        error => console.error(error)
                }
            );
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }
}