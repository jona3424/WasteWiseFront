export class Container {
    id : string;
    location : google.maps.LatLng
    icon: string;
    cause: string;
    timestamp: string;
    full: boolean;
    // containerId: number;
    // locationLatitude: number;
    // locationLongitude: number;
    // type: string;
    // capacity: number;
    // status: string;
    // lastCollectedAt: string;

    public constructor(id: string, lat : number, lon : number, full: boolean, cause: string, timestamp: string){
        this.id = id;
        this.full=full;
        this.location = new google.maps.LatLng(lat,lon)
        if(full){
            this.icon = "assets/images/wastered.png"
        }
        else {
            this.icon = "assets/images/wastegreen.png"
        }
        this.cause = cause;
        this.timestamp = timestamp;
    }
}