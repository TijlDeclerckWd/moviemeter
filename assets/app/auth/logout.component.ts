import {AuthService} from "./auth.service";

import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";


@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router){

    }

    ngOnInit(){
        this.authService.logout();
        this.router.navigateByUrl('login');
    }

}