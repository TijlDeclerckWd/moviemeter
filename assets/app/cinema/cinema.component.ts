import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-cinema',
    templateUrl: './cinema.component.html',
    styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

    lat;
    long;
    myLocation;
    map;
    interest;
    distance;
    markers = new Array();

    constructor(){

    }

    ngOnInit(){
        this.drawMap()
    }

    drawMap(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                this.lat = position.coords.latitude;
                this.long = position.coords.longitude;

                this.myLocation = new google.maps.LatLng(this.lat,this.long);

                let mapOptions = {
                    center: this.myLocation,
                    zoom: 11,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                this.map = new google.maps.Map(document.getElementById("mapArea"), mapOptions);


            }, this.onError, {
                maximumAge:60*1000, timeout:5*60*1000, enableHighAccuracy:true
            })
        }
        else {
            alert("your browser doesn't support HTML5 Geolocation!")
        }
    }

    onError(error){
        switch(error.code)

        {

            case 'PERMISSION_DENIED':

                alert("User denied permission");

                break;

            case 'TIMEOUT':

                alert("Geolocation timed out");

                break;

            case 'POSITION_UNAVAILABLE':

                alert("Geolocation information is not available");

                break;

            default:

                alert("Unknown error");

                break;

        }

    }

    getLocations(){
        this.interest = document.getElementById("interest").value;
        this.distance = document.getElementById("distance").value;
        console.log(this.distance);

        if (this.interest == "default"){
            alert("You have to select a point of interest")
        } else{
            let request = {
                location: this.myLocation,
                radius: this.distance,
                type: this.interest
            };

            let service = new google.maps.places.PlacesService(this.map);

            service.nearbySearch(request, (response, status) => {
                let latlngbounds = new google.maps.LatLngBounds();

                if (status == google.maps.places.PlacesServiceStatus.OK){
                    this.clearMarkers()

                    for (var i = 0 ; i < response.length;i++){
                        this.drawMarker(response[i]);
                        latlngbounds.extend(response[i].geometry.location);
                    }
                    this.map.fitBounds(latlngbounds);
                }
                else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                    alert("Sorry, there is no matching result!!");
                }
                else {
                    alert("Sorry, there is some error!")
                }
            })
        }
    }

    drawMarker(obj){
        let marker = new google.maps.Marker({
            position: obj.geometry.location,
            map: this.map
        });

        this.markers.push(marker);

        let infoWindow = new google.maps.InfoWindow({
            content: '<img src="' + obj.icon + '"/><span style="color:gray">' +

            obj.name + '<br />Rating: ' + obj.rating +

            '<br />Vicinity: ' + obj.vicinity + '</span>'
        });

        google.maps.event.addListener(marker, 'click', function(){

            infoWindow.open(this.map, marker);

        });
    }

    clearMarkers(){
      if (this.markers){
          for (let i in this.markers) {
              this.markers[i].setMap(null);
          }

          this.markers = [];
      }
    }
}