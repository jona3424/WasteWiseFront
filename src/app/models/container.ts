export class Container {
    id : string;
    location : google.maps.LatLng

    public constructor(id: string, lat : number, lon : number){
        this.id = id;
        this.location = new google.maps.LatLng(lat,lon)
    }
}