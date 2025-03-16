import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getToken() {
    return localStorage.getItem('token');
  }
  isAuthenticated() {
    return this.getToken() != null;
  }
  logout() {
    localStorage.removeItem('token');
  }
}
