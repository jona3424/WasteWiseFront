import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './models/user';
import { bo } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  ENDPOINT_URL:string = 'http://localhost:8080';
  //ENDPOINT_URL:string = 'https://fast-square-tortoise.ngrok-free.app';

  getUser(username: string, password: string){
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<User>(this.ENDPOINT_URL + "/login", null, { params });
  }

  signup(username: string, password: string, email: string, role: string){
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('email', email)
      .set('role', "USER");
    const user: User = new User();
    user.username=username;
    user.password=password;
    user.email = email;
    user.role = role;
    return this.http.post<User>(this.ENDPOINT_URL + "/auth/register", user);
  }

}
