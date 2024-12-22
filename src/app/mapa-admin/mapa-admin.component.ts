
import { Component, ViewEncapsulation, QueryList, ViewChildren, ViewChild, ElementRef, NgZone } from '@angular/core';

import {GoogleMap, MapInfoWindow, MapMarker, MapPolyline} from '@angular/google-maps'
import { DatabaseService } from '../services/database.service';
import { Container } from '../models/container';
import { LocationService } from '../services/location.service';
import { MapService } from '../map.service';
import { RoutfinderService } from '../services/routfinder.service';

interface Location {
  id: number;
  lat: number;
  lng: number;
}

interface Coordinate {
  lat: number;
  lng: number;
}


@Component({
  selector: 'app-mapa-admin',
  templateUrl: './mapa-admin.component.html',
  styleUrls: ['./mapa-admin.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class MapaAdminComponent {

private open : number = -1;
private lat : number = 44.791837;
private lng : number = 20.476937;
private map: google.maps.Map | undefined;



@ViewChild('googleMapSearch', { static: true }) searchElementRef!: ElementRef;
@ViewChild(GoogleMap) googleMap!: GoogleMap;

  mapOptions: google.maps.MapOptions = {
    center: { lat: this.lat, lng: this.lng},
    zoom : 13,
    styles: [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#46bcec"
              },
              {
                  "visibility": "on"
              }
          ]
      }
  ],
  streetViewControl: false,
    fullscreenControl: false,
    rotateControl: false,
    mapTypeControl: false,
    zoomControl: false, 
    scaleControl: false,
    panControl: false,

 }
 @ViewChildren(MapInfoWindow) infoWindowsView !: QueryList<MapInfoWindow>;
 openInfoWindow(marker: MapMarker, windowIndex: number) {
    if(windowIndex == this.open){

        this.infoWindowsView.get(this.open)?.close();
        this.open = -1;
    }else{
        if(this.open != -1){
            this.infoWindowsView.get(this.open)?.close();
        }
        this.open = windowIndex;
        this.infoWindowsView.get(windowIndex)?.open(marker);
    }
 }

 containers : Container[] | undefined;

 public static position : any;

 constructor(
    private readonly db: DatabaseService,
    private mapService: MapService,
    private ngZone: NgZone,
    private locationService: LocationService,
    private routeService: RoutfinderService
  ) {
  }

  ngOnInit(): void {
    this.mapService.getContainers().subscribe( data => {
      this.containers = [];
      data.forEach(c => {
          //alert(c['containerId'] + " " +  c['locationLatitude'] + "," + c['locationLongitude']);
          
          this.containers.push(new Container(c['containerId'], c['locationLatitude'], c['locationLongitude'], c['full'], c['cause'], c['timestamp']));
          
          // this.containers.push(new Container(c.id, c.location.lat, c.location.lng)) 
      });
  })
    navigator.geolocation.watchPosition((position)=>{

            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            // console.log("Ura "+latitude+","+longitude)
            MapaAdminComponent.position = { lat : latitude, lon : longitude};
            const pos = new google.maps.LatLng(latitude, longitude);
            if(!this.startPos && this.googleMap) this.googleMap.panTo(pos);
            this.startPos = pos

            if(this.routeReady && this.toSendContainers.length != 0){
                this.toSendContainers = this.toSendContainers.filter(container => { 
                    const lat = container.lat
                    const lon = container.lng

                    //Ovo racuna manje vise distancu u metrima
                    const deglen = 110.25
                    const x = lat - latitude
                    const y = (lon - longitude)*Math.cos(latitude)
                    const dist = deglen*Math.sqrt(x*x + y*y) * 1000

                    //TODO: Dogovoriti se kad je covek dovoljno blizu kontejneru

                    //TODO: Obojati kontejner zelenim
                    return dist > 50 // 50 metara
                });
            }
        })
    this.initAutocomplete();
  }

    private autocomplete: google.maps.places.Autocomplete | null = null;

    startPos : any;

    private initAutocomplete(): void {
        if (this.autocomplete) {
          google.maps.event.clearInstanceListeners(this.autocomplete);
        }
        

        this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        this.autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
              if (!this.autocomplete) return;
              const place = this.autocomplete.getPlace();
              if (place.geometry?.viewport) {
                // If the place has a viewport, use it to set the map bounds
                this.googleMap.fitBounds(place.geometry.viewport);
              } else if (place.geometry?.location) {
                // If no viewport, just set the center and zoom in
                this.googleMap.panTo(place.geometry.location);
                this.googleMap.zoom = 15; // You can adjust the zoom level 

              }
            });
          });
      }
      
      lastClicked : any;
      routeStartPoint : any;
      routeEndPoint : any;
      routeTLPoint : any;


      headings : string[] = ["Potvrdi pocetnu tacku", "Potvrdi krajnju tacku", "Potvrdi gornji lijevi cosak", "Potvrdi donji desni cosak"];
      current_step_index : number = 0

      doNextRouteStep(event : any){
        //TODO: Razmisliti o logici za reset rute
        if(this.current_step_index == 4) return;

        //TODO: Ako covek nije smecar return;
        const lat = event.latLng.lat()
        const lon = event.latLng.lng()

        this.lastClicked = new google.maps.LatLng(lat,lon);

        console.log(lat+","+lon);
      }

      onResponse(result : any){
        if(result){
            if(!this.routeStartPoint) { this.routeStartPoint = this.lastClicked; }
            else if(!this.routeEndPoint) { this.routeEndPoint = this.lastClicked;  }
            else if(!this.routeTLPoint){
                this.routeTLPoint = this.lastClicked
                this.bounds.north = this.lastClicked.lat()
                this.bounds.west = this.lastClicked.lng()
            }else{
                this.bounds.south = this.lastClicked.lat()
                this.bounds.east = this.lastClicked.lng()
                this.boundsReady = true

                //Posto ce ovo odmah da posalje zahtev u bazu...
                //TODO: Razmisliti da li ovo treba odmah da se zovne kad se iscrta pravougaonik ili da ima neko dugme start
                this.filterContainers(this.routeStartPoint);
            }
            this.current_step_index++;
        }
        this.lastClicked = null;
      }

    boundsReady = false;
    bounds = {
        north: 51.069581,
        south: 51.017964,
        east:  13.748602,
        west: 13.687615
    }; 
      openConfirmationWindow(confirmationMarker) {
            const marker = this.infoWindowsView.get(this.infoWindowsView.length-1);
            marker.open(confirmationMarker)
           
      }

      toSendContainers :Location[] = [];


      path: google.maps.LatLngLiteral[] = [];
      routeReady = false;

      filterContainers(startPoint:any){
        this.toSendContainers = []
        this.toSendContainers.push({
          id : 0,
          lat: startPoint.lat(),
          lng: startPoint.lng()
      })
        this.containers.forEach(element => {
            const lat = element.location.lat()
            const lon = element.location.lng()

            if( this.bounds.south <= lat && lat <= this.bounds.north &&
                this.bounds.west <= lon && lon <= this.bounds.east
                && element.full
            )
            this.toSendContainers.push({
                id : parseInt(element.id),
                lat: lat,
                lng: lon
            })
        });
        
        this.routeService.calculateRoute(this.toSendContainers).subscribe(
          (coords) => {
            this.path = coords;
          },
          (error) => {
            console.error('Error calculating route:', error);
          }
        );
        
          this.routeReady = true;
      }

}
