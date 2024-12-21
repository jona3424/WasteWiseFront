export class Container {
    id : string;
    location : google.maps.LatLng

    // containerId: number;
    // locationLatitude: number;
    // locationLongitude: number;
    // type: string;
    // capacity: number;
    // status: string;
    // lastCollectedAt: string;

    public constructor(id: string, lat : number, lon : number){
        this.id = id;
        this.location = new google.maps.LatLng(lat,lon)
    }
}