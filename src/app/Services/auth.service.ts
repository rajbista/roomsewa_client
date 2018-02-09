import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken : any;
  user: any;
  constructor(private http : Http) { }

  // Register User
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://still-dawn-88775.herokuapp.com/users/register', user, {headers: headers})
    .map( res => res.json());
  }

  // Authenticate User
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://still-dawn-88775.herokuapp.com/users/authenticate', user, {headers: headers})
    .map( res => res.json());
  }

  // Get Profile
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://still-dawn-88775.herokuapp.com/users/profile', {headers: headers})
    .map( res => res.json());
  }

  // Stors token and user to localStorage
  storeUserData(token, usr){
    localStorage.setItem('id token', token);
    localStorage.setItem('name', usr.name);

    this.authToken = token;
    this.user = usr;
  }

    // Load Token
    loadToken(){
      const token = localStorage.getItem('id token');
      this.authToken = token;
    }

    //LoggedIn
    loggedIn() {
      this.loadToken();
      if(this.authToken) return true;
      return false;
    }

    // Logout clears the token and user details
  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
