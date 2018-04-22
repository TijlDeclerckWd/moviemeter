import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";

import {ActivatedRoute, Router} from "@angular/router";
import {User} from "./user.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    myForm: FormGroup;
    returnUrl = null;

    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute){}

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('fullName', data.fullName);
                    if (this.returnUrl){
                        this.router.navigateByUrl(this.returnUrl);
                    } else {
                        this.router.navigateByUrl('/')
                    }
                },
                error => console.error(error)
            )
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe( (queryparams) => {
            console.log(queryparams);
            this.returnUrl = queryparams.returnUrl;
        });

        this.myForm = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }


}