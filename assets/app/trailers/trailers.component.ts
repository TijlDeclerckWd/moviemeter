import {Component, OnDestroy, OnInit, Pipe, PipeTransform, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Component({
    selector: 'app-trailers',
    templateUrl: './trailers.component.html',
    styleUrls: ['./trailers.component.css']
})

export class TrailersComponent implements OnInit, OnDestroy{

    currentIndex = 0;
    videoIds = [];
    @ViewChild('trailerZone') trailerZone;
    ngUnsubscribe = new Subject();


    constructor(private route: ActivatedRoute, private router: Router){

    }

    ngOnInit(){
        this.route.queryParams
            .takeUntil(this.ngUnsubscribe)
            .subscribe( params => {
            this.videoIds = params.ids.split('&');
            this.currentIndex = this.videoIds.indexOf(params.chosenId);
        });

        Observable.fromEvent(document, 'keydown')
            .takeUntil(this.ngUnsubscribe)
            .subscribe(e => {
            if (e.code === 'ArrowRight' && this.currentIndex !== this.videoIds.length -1) {
                this.currentIndex++
            }
            else if (e.code === 'ArrowLeft' && this.currentIndex !== 0) {
                this.currentIndex--
            }
        })
    }

    ngOnDestroy(){
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
