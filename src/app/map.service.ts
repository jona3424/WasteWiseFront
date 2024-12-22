import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Container } from './models/container';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }
  
  // ENDPOINT_URL:string = 'http://localhost:8080';
  ENDPOINT_URL:string = 'https://fast-square-tortoise.ngrok-free.app';
  

  getContainers() {
    return this.http.post<Container[]>(this.ENDPOINT_URL + "/container/getAllContainers", null);
  }

  updateCollected(containerId: number) {
    return this.http.post<any>(this.ENDPOINT_URL + "/container/updateCollected", containerId);
  }
}
