import { Routes } from "@angular/router";
import {Top100Component} from "./top100.component";



export const TOPLISTS_ROUTES: Routes = [
    { path: ':id', component: Top100Component },
];