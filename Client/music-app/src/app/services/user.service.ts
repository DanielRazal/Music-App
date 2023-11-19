import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../models/User';
import { environment } from 'src/environments/environment';
import Login from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseUrl = environment.baseUrl;
  private userApi = environment.user;
  private registrationUrl = environment.register;
  private loginUrl = environment.login;

  constructor(private http: HttpClient) { }

  private headers() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return httpOptions;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + this.userApi + this.registrationUrl, user, this.headers());
  }

  login(login: Login): Observable<Login> {
    return this.http.post<Login>(this.baseUrl + this.userApi + this.loginUrl, login, this.headers())
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(this.baseUrl + this.userApi + "/" + id);

  }
}
