import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  login() {
    this.loggedIn.next(true);
    localStorage.setItem('user', 'loggedIn'); 
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('user');
  }

  checkLogin() {
    const user = localStorage.getItem('user');
    this.loggedIn.next(!!user);
  }
}
