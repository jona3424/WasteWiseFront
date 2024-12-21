import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Container } from './models/container';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }
  

  getContainers() {
    return this.http.get<Container[]>("http://localhost:8080/container/getAllContainers");
  }
}
