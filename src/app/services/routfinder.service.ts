import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Location {
  id: number;
  lat: number;
  lng: number;
}

interface Coordinate {
  lat: number;
  lng: number;
}

interface RouteRequest {
  locations: Location[];
}

@Injectable({
  providedIn: 'root'
})
export class RoutfinderService {

  constructor(private http: HttpClient) { }

  ENDPOINT_URL: string = 'http://localhost:8080';
  // ENDPOINT_URL:string = 'https://fast-square-tortoise.ngrok-free.app';



  calculateRoute(locations: Location[]) {
    const routeRequest: RouteRequest = { locations };
    return this.http.post<Coordinate[]>(this.ENDPOINT_URL + "/api/route", routeRequest);
  }
}