import {RouterModule, Routes} from "@angular/router";
import {ToplistsComponent} from "./toplists/toplists.component";
import {HomeComponent} from "./home/home.component";

import {TOPLISTS_ROUTES} from "./toplists/toplists.routing";
import {MovieComponent} from "./movie/movie.component";
import {AddMovieComponent} from "./movie/addMovie.component";
import {SignupComponent} from "./auth/signup.component";
import {LoginComponent} from "./auth/login.component";
import {LogoutComponent} from "./auth/logout.component";
import {RoleGuardService} from "./auth/role-guard.service";
import {MovieChatComponent} from "./movie-chat/movie-chat.component";
import {TrailersComponent} from "./trailers/trailers.component";


const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'toplists',
        component: ToplistsComponent,
        children: TOPLISTS_ROUTES
    },
    {
        path: 'movies/:id',
        component: MovieComponent
    },
    {
        path: 'addmovie',
        component: AddMovieComponent,
        canActivate: [RoleGuardService],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'movieChat',
        component: MovieChatComponent
    },
    {
        path: 'trailers',
        component: TrailersComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);