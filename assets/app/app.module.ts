import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {HeaderComponent} from "./header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {routing} from "./app.routing";
import {HomeComponent} from "./home/home.component";
import {ToplistsComponent} from "./toplists/toplists.component";
import {Top100Component} from "./toplists/top100.component";
import { MovieService} from "./movie/movie.service";
import {HttpModule} from "@angular/http";
import {MovieComponent} from "./movie/movie.component";
import {RouterModule} from "@angular/router";
import {AddMovieComponent} from "./movie/addMovie.component";
import {SignupComponent} from "./auth/signup.component";
import {AuthService} from "./auth/auth.service";
import {LoginComponent} from "./auth/login.component";
import {LogoutComponent} from "./auth/logout.component";
import {CinemaComponent} from "./cinema/cinema.component";
import {CinemaFeaturedComponent} from "./cinema/cinema-featured.component";
import {CinemaService} from "./cinema/cinema.service";
import {ReviewComponent} from "./review/review.component";
import {ReviewService} from "./review/review.service";
import {ReviewListComponent} from "./review/review-list.component";
import {RoleGuardService} from "./auth/role-guard.service";
import {ToplistsService} from "./toplists/toplists.service";
import {HttpClientModule} from "@angular/common/http";
import {MovieChatComponent} from "./movie-chat/movie-chat.component";
import {MovieChatService} from "./movie-chat/movie-chat.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SafePipe, TrailersComponent} from "./trailers/trailers.component";
import {ProfileComponent} from "./user/profile.component";
import {SearchComponent} from "./search/search.component";



@NgModule({
    declarations: [
        AppComponent,
        CinemaComponent,
        CinemaFeaturedComponent,
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        LogoutComponent,
        MovieChatComponent,
        ProfileComponent,
        ReviewComponent,
        ReviewListComponent,
        TrailersComponent,
        ToplistsComponent,
        Top100Component,
        MovieComponent,
        AddMovieComponent,
        SearchComponent,
        SignupComponent,
        SafePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        routing,
        HttpModule,
        RouterModule,
        ReactiveFormsModule
    ],
    bootstrap: [AppComponent],
    providers: [
        MovieService,
        AuthService,
        CinemaService,
        HttpClientModule,
        MovieChatService,
        ReviewService,
        RoleGuardService,
        ToplistsService
    ]
})
export class AppModule {

}